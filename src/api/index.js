import axios from 'axios'

function getBaseUrl () {
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
  return instance.post(`floors/${shutter.floorId}/shutters`, shutter)
}
