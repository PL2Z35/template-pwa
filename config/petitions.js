/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from 'next/router'
import { fetchWithoutBody, fetchWithBody, fetchWithoutHeaders } from './api'
import { auth } from '../scripts/firebase'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    signInWithPopup,
    FacebookAuthProvider,
    deleteUser as deleteFirebaseUser,
} from 'firebase/auth'
import { devNull } from 'os'

const user_default = {
    firstname: 'user',
    lastname: 'hitch',
    country: 'COLOMBIA',
}


async function get_All_Countries() {
    const countriesData = await fetchWithoutBody('GET', 'get_countries')
    return countriesData
}

async function signin_user(email, password) {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password)
        const token = await res.user.getIdToken()
        if (token) {
            localStorage.setItem('token', token)
            const user = await fetchWithBody('POST', 'login', null)
            set_user(user)
            if (user.email === undefined) {
                logout()
                return false
            }
            return true
        }
        return false
    } catch (error) {
        return false
    }
}

async function register_firebase(values) {
    try {
        const res = await createUserWithEmailAndPassword(
            auth,
            values.email,
            values.password,
        )
        const token = await res.user.getIdToken()
        if (token) {
            localStorage.setItem('token', token)
            return await register(
                values.firstname,
                values.lastname,
                values.country,
                values.gender,
                values.date,
            )
        }
        return false
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            console.error('El correo electrónico ya está en uso')
        } else {
            console.error(error.message)
        }
        return false
    }
}

async function register(firstname, lastname, country, gender, birthdate) {
    try {
        const body = {
            fcm_token: '123',
            firebase_token: localStorage.getItem('token'),
            firstname: firstname != null ? firstname : 'Usuario',
            lastname: lastname != null ? lastname : 'Hitch',
            country_name: country != null ? country : 'COLOMBIA',
            gender: gender != null ? Number(gender) : 3,
            birthdate: birthdate != 'NaN-NaN-NaN' ? birthdate : '2000-01-01',
        }
        await fetchWithBody('POST', 'register', body)
        logout()
        return true
    } catch (error) {
        return false
    }
}

async function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('firstname')
    localStorage.removeItem('lastname')
    localStorage.removeItem('email')
    localStorage.removeItem('id')
    localStorage.removeItem('tokenHitch')
}

const GoogleAuthProviderToken = () => {
    try {
        const provider = new GoogleAuthProvider()
        provider.addScope('profile')
        provider.addScope('email')
        signInWithPopup(auth, provider)
            .then(async (result) => {
                //como obtengo en email de este usuario
                const token = result.user.accessToken
                localStorage.setItem('token', token)
                if (token) {
                    let user = await fetchWithBody('POST', 'login', null)
                    set_user(user)
                    if (user.email === undefined) {
                        await register(null, null, null, null, 'NaN-NaN-NaN')
                        localStorage.setItem('token', token)
                        user = await fetchWithBody('POST', 'login', null)
                        set_user(user)
                        console.log(localStorage.getItem('token'))
                        console.log(localStorage.getItem('email'))
                        window.location.href = '/'
                        return true
                    }
                    window.location.href = '/'
                    return true
                }
                return false
            })
            .catch((error) => {
                return false
            })
    } catch (error) {
        return false
    }
}

const FacebookAuthProviderToken = () => {
    try {
        const provider = new FacebookAuthProvider()
        provider.addScope('profile')
        provider.addScope('email')
        signInWithPopup(auth, provider)
            .then(async (result) => {
                //como obtengo en email de este usuario
                const token = result.user.accessToken
                localStorage.setItem('token', token)
                if (token) {
                    let user = await fetchWithBody('POST', 'login', null)
                    set_user(user)
                    if (user.email === undefined) {
                        await register(null, null, null, null, 'NaN-NaN-NaN')
                        localStorage.setItem('token', token)
                        user = await fetchWithBody('POST', 'login', null)
                        set_user(user)
                        console.log(localStorage.getItem('token'))
                        console.log(localStorage.getItem('email'))
                        window.location.href = '/'
                        return true
                    }
                    window.location.href = '/'
                    return true
                }
                return false
            })
            .catch((error) => {
                return false
            })
    } catch (error) {
        return false
    }
}

function set_user(user) {
    localStorage.setItem('firstname', user.firstname)
    localStorage.setItem('lastname', user.lastname)
    localStorage.setItem('email', user.email)
    localStorage.setItem('id', user.id)
    localStorage.setItem('birthdate', user.birthdate)
    localStorage.setItem('gender', user.gender)
    localStorage.setItem('tokenHitch', user.token)
    localStorage.setItem('userImage', '/images/user.jpg')

}

async function forgot_password(email) {
    await sendPasswordResetEmail(auth, email)
        .then(() => {
            return true
        })
        .catch((error) => {
            return false
        })
    return false
}

async function deleteUser() {
    try {
        const user = auth.currentUser;

        if (user) {
            await deleteFirebaseUser(user);
            localStorage.removeItem('token');
            localStorage.removeItem('firstname');
            localStorage.removeItem('lastname');
            localStorage.removeItem('email');
            localStorage.removeItem('id');
            localStorage.removeItem('tokenHitch');
            localStorage.removeItem('userImage');
            return true;
        } else {
            console.error('No hay usuario logeado');
            return false;
        }
    } catch (error) {
        console.error('Error al borrar usuario', error.message);
        return false;
    }
}
async function get_all_total_categories() {
    const categoriesData = await fetchWithoutBody(
        'GET',
        'get_all_global_categories?country_name=' + localStorage.getItem('country'),
    )
    console.log(categoriesData)
    return categoriesData.results
}

async function get_all_sub_categories(id) {
    const categoriesData = await fetchWithoutBody(
        'GET',
        'get_sub_categories?country_name=' +
        localStorage.getItem('country') +
        '&category_id=' +
        id,
    )
    const results = categoriesData.SubCategory.map((category) => {
        return { ...category, image_2: category.image }
    })
    return { title: categoriesData.spanish, data: results }
}

async function get_all_for_categories(name) {
    let url = 'get_all_categories'
    switch (name) {
        case 'FARMACIA':
            url += '_pharma'
            break
        case 'MARKET':
            url += '_market'
            break
    }
    const categoriesData = await fetchWithoutBody(
        'GET',
        url + '?country_name=' + localStorage.getItem('country'),
    )
    const results = categoriesData.results.map((category) => {
        return { ...category, image_2: category.image }
    })
    return { title: name, data: results }
}

function isAuthenticate() {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    return !!token && !!email;
}


async function get_home_products(isWeb = true) {
    const url = `get_home_products?country_name=${localStorage.getItem('country')}&is_web=${isWeb}`;
    const categoriesData = await fetchWithoutBody('GET', url);
    return categoriesData;
}

async function get_retailer(model) {
    const categoriesData = await fetchWithoutBody(
        'GET',
        'get_product_retailers?country_name=' +
        localStorage.getItem('country') +
        '&hitch_model=' +
        model,
    )
    return categoriesData
}

async function get_retailer_by_id(id) {
    const categoriesData = await fetchWithoutBody(
        'GET',
        'get_retailer_by_id?country_name=' +
        localStorage.getItem('country') +
        '&id=' +
        id,
    )
    return categoriesData
}

async function get_product_retialres(model) {
    const categoriesData = await fetchWithoutBody(
        'GET',
        'get_product_retailers?country_name=' +
        localStorage.getItem('country') +
        '&hitch_model=' +
        model,
    )
    return categoriesData
}

async function get_prices_by_retailer() {
    const categoriesData = await fetchWithoutBody(
        'GET',
        'get_prices_by_retailer?country_name=' +
        localStorage.getItem('country') +
        '&hitch_id=' +
        localStorage.getItem('idProduct'),
    )
    return categoriesData
}

async function get_tracking_list() {
    const categoriesData = await fetchWithoutHeaders(
        'GET',
        'get_tracking_list?country_name=' +
        localStorage.getItem('country'),
    )
    console.log(categoriesData)
    return categoriesData
}

async function get_retailers() {
    const categoriesData = await fetchWithoutBody(
        'GET',
        'get_retailers?country_name=' + localStorage.getItem('country'),
    )
    return categoriesData
}
async function get_comments(model) {
    const categoriesData = await fetchWithoutBody(
        'GET',
        'get_comments?hitch_id=' + model,
    )
    return categoriesData
}

async function get_all_products(page, category, subcategory) {
    let params = `?limit=30&country_name=${localStorage.getItem('country')}&page=${page}`
    let url = ''
    switch (category) {
        case 'FARMACIA':
            url += '_pharma'
            break
        case 'MARKET':
            url += '_market'
            break
    }
    if (subcategory) {
        params += `&subcategory_id=${subcategory}`
    }
    const fullUrl = `search_products${url}${params}`
    try {
        const categoriesData = await fetchWithoutBody('GET', fullUrl)
        categoriesData.page = page
        return categoriesData
    } catch (error) {
        console.error('Error fetching products:', error)
        throw error
    }
}

export {
    deleteUser,
    get_retailers,
    get_prices_by_retailer,
    get_comments,
    get_product_retialres,
    get_retailer_by_id,
    get_retailer,
    get_all_products,
    get_home_products,
    get_all_for_categories,
    get_all_sub_categories,
    isAuthenticate,
    get_all_total_categories,
    register,
    get_All_Countries,
    signin_user,
    logout,
    GoogleAuthProviderToken,
    FacebookAuthProviderToken,
    forgot_password,
    register_firebase,
    get_tracking_list
}
