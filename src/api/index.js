import axios from 'axios'

export function getBaseUrl () {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:8000/api/v1/'
  } else {
    return '/api/v1/'
  }
}
var instance = axios.create({
  baseURL: getBaseUrl()
})

export function getAllShutters () {
  return instance.get('shutters')
}

export function getAllFloors () {
  return instance.get('floors')
}

export function controlShutterByAction (id, action) {
  return instance.post(`shutters/${id}/${action}`)
}

export function controlLightingByAction (id, action) {
  return instance.post(`lightings/${id}/${action}`)
}

export function deleteShutterById (id) {
  return instance.delete(`shutters/${id}`)
}

export function deleteLightingById (id) {
  return instance.delete(`lightings/${id}`)
}

export function updateFloor (floor) {
  return instance.put(`floors/${floor.id}`, floor)
}

export function createFloor (floor) {
  return instance.post('floors', floor)
}

export function updateShutter (shutter) {
  shutter.openPin = Number(shutter.openPin)
  shutter.closePin = Number(shutter.closePin)
  shutter.completeWayInSeconds = Number(shutter.completeWayInSeconds)
  return instance.put(`shutters/${shutter.id}`, shutter)
}

export function createShutter (shutter) {
  shutter.openPin = Number(shutter.openPin)
  shutter.closePin = Number(shutter.closePin)
  shutter.completeWayInSeconds = Number(shutter.completeWayInSeconds)
  return instance.post('shutters', shutter)
}

export function deleteFloorById (floorId) {
  return instance.delete(`floors/${floorId}`)
}
