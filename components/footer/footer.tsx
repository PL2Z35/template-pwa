import React from 'react'
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faFacebook,
	faInstagram,
	faTiktok,
} from '@fortawesome/free-brands-svg-icons'

export default function App() {

    return (
        <footer className='rounded-xl hidden sm:block mt-10 color-navbar' >
            <div className='container m-auto space-y-8 px-6 py-16 md:px-12 lg:px-20'>
                <div className='flex flex-wrap items-center justify-between gap-4 border-b pb-8'>
                    <img
                        width='100'
                        height='42'
                        src='/images/iconHitch.png'
                        alt='logo hitch'
                        className='w-32'
                    />
                    <div className='flex gap-6 col-start-auto'>
					<a href='https://www.facebook.com/hitchmeapp' target='_blank'>
							<FontAwesomeIcon
								icon={faFacebook}
								className='social-icon facebook-icon'
							/>
						</a>
						<a href='https://www.instagram.com/hitchme.app/' target='_blank'>
							<FontAwesomeIcon
								icon={faInstagram}
								className='social-icon instagram-icon'
							/>
						</a>
						<a href='https://www.tiktok.com/@hitchme.app' target='_blank'>
							<FontAwesomeIcon
								icon={faTiktok}
								className='social-icon tiktok-icon'
							/>
						</a>
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-4'>
                    <div>
                        <h6 className='text-lg text-white'>DESCARGA LA APP</h6>
                        <ul className='mt-1 list-inside space-y-4'>
                            <li className='mb-0'>
                                <a
                                    href='https://play.google.com/store/apps/details?id=com.hitch.app.android'
                                    target='_blank'
                                    className='transition hover:text-cyan-600'

                                >
                                    <Image
                                        src='/google-play-badge.svg'
                                        alt='Google Play Badge'
                                        className='logo-pap'
                                        width='150'
                                        height='20'
                                    />
                                </a>
                                <a
                                    href='https://apps.apple.com/co/app/hitch/id1591257825'
                                    target='_blank'
                                >
                                    <Image src='/appstore-badge.svg' alt='App Store Badge'
                                    width='150'
                                    height='20' />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h6 className='text-lg text-white'>FAQ</h6>
                        <ul className='mt-4 list-inside space-y-4'>
                            <li>
                                <a
                                    href='https://info.hitchme.app/pqr/'
                                    target='_blank'
                                    className='transition text-white hover:text-teal-600'
                                >
                                    Atención al Usuario
                                </a>
                            </li>
                            <li>
                                <a
                                    href='https://info.hitchme.app/politicas-de-privacidad/'
                                    target='_blank'
                                    className='transition text-white hover:text-gray-600'
                                >
                                    Términos y Condiciones
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h6 className='text-lg text-white'>Proveedores</h6>
                        <ul className='mt-4 list-inside space-y-4'>
                            <li>
                                <a
                                    href='https://info.hitchme.app/proveedores/'
                                    target='_blank'
                                    className='transition text-white hover:text-gray-600'
                                >
                                    Quiero ser proveedor
                                </a>
                            </li>

                        </ul>
                    </div>
                </div>
                <div className='flex justify-between rounded-md bg-gray-200 px-4 py-3 text-gray-600'>
                    <span>
                        &copy; Hitch <span id='year'></span>
                    </span>
                    <a href='#' className='font-medium transition hover:text-cyan-600'>
                        Licencia
                    </a>
                </div>
            </div>
        </footer>
    )
}
