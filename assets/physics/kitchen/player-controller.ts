import * as ecs from '@8thwall/ecs'

const characterController = ecs.registerComponent({
  name: 'characterController',
  // Define configurable properties for the ball
  schema: {
    force: ecs.f32,
    jumpForce: ecs.f32,
    jumpControlFactor: ecs.f32,
  },
  // Set default values for schema properties
  schemaDefaults: {
    force: 20.0,
    jumpForce: 500.0,
    jumpControlFactor: 0.25,
  },
  // Define internal data used by the component
  data: {
    isGrounded: ecs.boolean,  // Tracks if the ball is touching the ground
    collisionCount: ecs.i32,  // Counts active collisions
  },
  // State machine to manage ball's behavior
  stateMachine: ({world, eid, dataAttribute}) => {
    // Helper function to update grounded state based on collisions
    const updateGroundedState = () => {
      const data = dataAttribute.cursor(eid)
      data.isGrounded = data.collisionCount > 0
    }

    // Handle start of a collision
    const handleCollisionStart = () => {
      const data = dataAttribute.cursor(eid)
      data.collisionCount++
      updateGroundedState()
    }

    // Handle end of a collision
    const handleCollisionEnd = () => {
      const data = dataAttribute.cursor(eid)
      data.collisionCount = Math.max(0, data.collisionCount - 1)
      updateGroundedState()
    }

    // Define the 'ball' state - this is the only state we need
    ecs.defineState('ball').initial()
      .onEnter(() => {
        // Set up collision listeners when entering the state
        world.events.addListener(eid, ecs.physics.COLLISION_START_EVENT, handleCollisionStart)
        world.events.addListener(eid, ecs.physics.COLLISION_END_EVENT, handleCollisionEnd)
        updateGroundedState()
      })
      .onExit(() => {
        // Clean up listeners when exiting the state
        world.events.removeListener(eid, ecs.physics.COLLISION_START_EVENT, handleCollisionStart)
        world.events.removeListener(eid, ecs.physics.COLLISION_END_EVENT, handleCollisionEnd)
      })

    // Initialize ball data
    dataAttribute.set(eid, {isGrounded: false, collisionCount: 0})
  },
  tick: (world, component) => {
    const {eid} = component
    const schema = characterController.get(world, eid)
    const {isGrounded} = component.data
    // Reduce control when in air
    const controlFactor = isGrounded ? 1 : schema.jumpControlFactor

    // Calculate movement forces based on input
    let forceX = 0
    let forceZ = 0
    if (world.input.getAction('forward')) forceZ -= schema.force * controlFactor
    if (world.input.getAction('backward')) forceZ += schema.force * controlFactor
    if (world.input.getAction('left')) forceX -= schema.force * controlFactor
    if (world.input.getAction('right')) forceX += schema.force * controlFactor

    // Normalize the force vector for consistent speed in all directions
    const magnitude = Math.sqrt(forceX * forceX + forceZ * forceZ)
    if (magnitude > 0) {
      forceX = (forceX / magnitude) * schema.force * controlFactor
      forceZ = (forceZ / magnitude) * schema.force * controlFactor
    }

    // Apply movement forces to the ball
    ecs.physics.applyForce(world, eid, forceX, 0, forceZ)

    // Handle jumping
    if (world.input.getAction('jump') && isGrounded) {
      ecs.physics.applyImpulse(world, eid, 0, schema.jumpForce, 0)
      // Reset grounded state on jump
      component.data.collisionCount = 0
      component.data.isGrounded = false
    }
  },
})

export {characterController}
