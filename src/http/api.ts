'use client'

import { baseHeaders } from './baseHeaders.js'

const API = 'https://bus.e-bus.site/'

class HttpClient {
  private baseURL: string
  private baseHeaders?: HeadersInit
  private sendFormHeaders?: HeadersInit

  constructor(baseURL: string, baseHeaders: HeadersInit = {}) {
    ;(this.baseURL = baseURL), (this.baseHeaders = baseHeaders)
    this.sendFormHeaders = {}
    for (const key in baseHeaders) {
      if (key !== 'Content-Type') {
        this.sendFormHeaders[key] = baseHeaders[key]
      }
    }
  }

  private async _handleResponse(response: Response): Promise<{ data: any; status: number }> {
    const data = await response.json()

    if (response.ok) {
      return {
        data,
        status: response.status,
      }
    } else {
      throw {
        message: { text: data.message || 'Something went wrong', status: response.status },
      }
    }
  }

  async get(url: string, Authorization: string, headers?: HeadersInit) {
    const response = await fetch(this.baseURL + url, {
      method: 'GET',
      headers: {
        ...this.baseHeaders,
        ...headers,
        Authorization: 'Bearer ' + Authorization,
      },
    })

    return await this._handleResponse(response)
  }

  async post(url: string, Authorization: string, data: any, headers?: HeadersInit) {
    const response = await fetch(this.baseURL + url, {
      method: 'POST',
      headers: {
        ...this.baseHeaders,
        ...headers,
        Authorization: 'Bearer ' + Authorization,
      },
      body: JSON.stringify(data),
      // body: data
    })

    return await this._handleResponse(response)
  }

  async put(url: string, Authorization: string, data: any, headers?: HeadersInit) {
    const response = await fetch(this.baseURL + url, {
      method: 'PUT',
      headers: {
        ...this.baseHeaders,
        ...headers,
        Authorization: 'Bearer ' + Authorization,
      },
      body: JSON.stringify(data),
    })

    return await this._handleResponse(response)
  }

  async delete(url: string, Authorization: string, data?: any, headers?: HeadersInit) {
    const response = await fetch(this.baseURL + url, {
      method: 'DELETE',
      headers: {
        ...this.baseHeaders,
        ...headers,
        Authorization: 'Bearer ' + Authorization,
      },
      body: data,
    })

    return await this._handleResponse(response)
  }

  async sendForm(url: string, Authorization: string, data: FormData, method: string = 'POST') {
    const response = await fetch(this.baseURL + url, {
      method,
      headers: {
        ...this.sendFormHeaders,
        Authorization: 'Bearer ' + Authorization,
      },
      body: data,
    })

    return await this._handleResponse(response)
  }
}

const $api = new HttpClient(API, baseHeaders)

export default $api
