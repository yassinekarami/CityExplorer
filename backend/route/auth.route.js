import { register, login } from "../controller/auth.controller.js"


const registerRoute = {
  method: 'POST',
  url: '/auth/register',
  handler: register,
  schema: {
    body: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: { type: 'string'},
        password: { type: 'string' }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          userId: { type: 'string' }
        }
      }
    }
  }
}


const loginRoute = {
  method: 'POST',
  url: '/auth/login',
  handler: login
}

// const loginRoute = {
//   method: 'POST',
//   url: '/api/auth/login',
//   handler: login,
//   schema: {
//     body: {
//       type: 'object',
//       required: ['email', 'password'],
//       properties: {
//         email: { type: 'string'},
//         password: { type: 'string' }
//       }
//     },
//     response: {
//       200: {
//         type: 'object',
//         properties: {
//           message: { type: 'string' },
//           userId: { type: 'string' }
//         }
//       }
//     }
//   }
// }

export {registerRoute, loginRoute}