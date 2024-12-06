import axios from 'axios'
import Cookies from 'js-cookie'
import { CookieName } from './utils'

export let URL = `https://educonnect.pinerockcreditunion.com/api/v1`;
export let profileImg = `https://educonnect.pinerockcreditunion.com`;

const user = 'user'

export const non_auth_urls = {
    create_acc: user + `/signup`,
    login: user + '/login',
    verify_email: user + '/email_verify',

    //categories
    fetch_categories : user + '/fetch_all_categories',

    //Non auth password change
    find_account: user + '/find_account/:email', //requires an email
    otp_for_password: user + '/otp_for_password',
    resend_otp_for_password: user + '/resend_otp',
    change_non_auth_password: user + '/change_password',

    //Non auth email verify otp
    resend_otp_for_email: user + '/resend_otp_for_email_verify',
    email_sub: user + '/email_sub',
}
export const auth_urls = {
    profile: user + '/profile',
    get_single_user : user + '/getsingle_user/:id',//requires an id
    profile_update: user + '/update_profile', //PUT Request
    upload_profileImg: user + '/upload_profileimg',

    //Auth password change
    send_otp: user + '/verify_otp_for_password',
    change_auth_password: user + '/change_password',

   //Questions routes
   post_question: user + '/create_question',
   edit_question_post: user + '/update_question',
   fetch_all_questionposts: user + '/fetch_all_questions',
   fetch_single_question: user + '/get_single_question/:id', //requires an id
   fetch_one_user_questions : user + '/get_one_user_questions',
   delete_question: user + '/delete_question/:id', //requires an Id

   //Answers
   post_answer: user + '/comment_answer',
   edit_post_anser : user +'/update_answer',
   delete_answer: user + '/delete_answer/:id', //requires an id
   get_single_answer: user +'/get_single_answer',

   //Upvotes
   upvote: user + '/upvote_an_answer',

    logout: user + '/logout',
    
}

export const Apis = {
    non_auth: non_auth_urls,
    auth: auth_urls,
}

// Use for Nonn-Authenticated Get requests
export const ClientGetApi = async (endpoint) => {
    const response = await axios.get(`${URL}/${endpoint}`)
    return response.data
}

// Use for Non-Authenticated Post requests
export const ClientPostApi = async (endpoint, data) => {
    const response = await axios.post(`${URL}/${endpoint}`, data)
    return response.data
}

// Use for Authenticated Get requests
export const GetApi = async (endpoint) => {
    const getCookie = Cookies.get(CookieName)
    const response = await axios.get(`${URL}/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${getCookie}` 
        }
    })
    return response.data
}


// Use for Authenticated Post requests
export const PostApi = async (endpoint, data) => {
    const token = Cookies.get(CookieName)
    const response = await axios.post(`${URL}/${endpoint}`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

// Use for Authenticated Delete requests
export const DeleteApi = async (endpoint, data) => {
    const token = Cookies.get(CookieName)
    const response = await axios.delete(`${URL}/${endpoint}`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

//For Logout
export const LogoutApi = async (endpoint) => {
    const token = Cookies.get(CookieName)
    const response = await axios.post(`${URL}/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

// Use for Authenticated Put requests
export const PutApi = async (endpoint, data) => {
    const token = Cookies.get(CookieName)
    const response = await axios.put(`${URL}/${endpoint}`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}
