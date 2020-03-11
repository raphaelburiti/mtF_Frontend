import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import Header from '../../Components/Header'
import ProgressBar from '../../Components/ProgressBar'
import CalendarSection from '../../Components/CalendarSection'
import ShowReportSection from '../../Components/ShowReportSection'
import FormSection from '../../Components/FormSection'

import './styles.css'

import loading from '../../assets/load.gif'

export default function Main() {

    const { data } = useSelector(state => state.serviceRecord)

    useEffect(() => {
        const divLoad = document.querySelector('.load')

        setTimeout(() => {
            divLoad.classList.add('fadeOutLoad')
            setTimeout(() => {
                divLoad.style.display = 'none'
            }, 400)
        }, 700)
    }, [])


    return (
        <>
            <Header />
            <ProgressBar />
            <div className="load">
                <img className="loading" src={loading} alt="a" width="60px" />
            </div>

            {data !== [] ? (
                <div className="container-main">
                    <CalendarSection />
                    <ShowReportSection />
                    <FormSection />
                </div>
            ) : (
                    <div className="container-load">
                        <img className="loading" src={loading} alt="a" width="60px" />
                    </div>
                )
            }
        </>
    )
}