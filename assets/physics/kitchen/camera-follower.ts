import * as ecs from '@8thwall/ecs'  // This is how you access the ecs library.

const {Position} = ecs
const {vec3} = ecs.math

const offset = vec3.zero()
const playerPosition = vec3.zero()

const cameraFollower = ecs.registerComponent({
  name: 'cameraFollower',
  schema: {
    player: ecs.eid,  // Reference to the player entity
    camera: ecs.eid,  // Reference to the camera entity
    offsetX: ecs.f32,  // X offset for the camera position
    offsetY: ecs.f32,  // Y offset for the camera position
    offsetZ: ecs.f32,  // Z offset for the camera position
  },
  schemaDefaults: {
    offsetX: 0,  // Default X offset
    offsetY: 8,  // Default Y offset
    offsetZ: 10,  // Default Z offset
  },
  tick: (world, component) => {
    const {player, camera, offsetX, offsetY, offsetZ} = component.schema
    offset.setXyz(offsetX, offsetY, offsetZ)

    // Set the camera position to the current player position plus an offset.
    Position.set(world, camera, playerPosition.setFrom(Position.get(world, player)).setPlus(offset))
  },
})

export {cameraFollower}
