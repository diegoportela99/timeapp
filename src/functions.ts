//import React from 'react'

export const readDisplayName: () => string | null = () => {

    return (sessionStorage.getItem("displayName"))
}

export function readEmail() {

    return (sessionStorage.getItem("email"))
}

export function readUID() {

    return (sessionStorage.getItem("uid"))

}

export function readImageURL(): any {
    return (sessionStorage.getItem("imageURL"))
}

export function readTaskAmount(): any {
    return (sessionStorage.getItem("taskAmount"))
}


export function isLoggedIn() {
    let keys = Object.keys(window.sessionStorage)
    // console.log(keys)
    // console.log(sessionStorage.getItem(keys[0]))
    // console.log(typeof(sessionStorage.getItem(keys[0])))

    if (sessionStorage.getItem(keys[0]) == null) {
        return (false)
    } else {
        return (true)
    }
}

export function getFirstName() {
    let name = readDisplayName()
    const firstName:any = name?.split(" ")

    return (firstName[0])
}