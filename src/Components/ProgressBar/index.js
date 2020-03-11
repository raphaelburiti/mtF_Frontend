import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './styles.css'

export default function ProgressBar() {

  const dispatch = useDispatch()

  const { activateProgressBar } = useSelector(state => state.activateProgressBar)
  const { loadIsTrue } = useSelector(state => state.activateProgressBar)

  useEffect(() => {

    var progress = document.querySelector('.progress')

    if (!activateProgressBar) {
      progress.style.display = 'none'
      progress.value = 0
      dispatch({ type: 'ADD_ACTIVATEPROGRESSBAR', payload: false })
      return
    }

    progress.style.display = 'block'

    if (!loadIsTrue) {
      progress.value = 0
      var interval = setInterval(function () {
        progress.value++
        if (progress.value >= 30) {
          clearInterval(interval)

          var second_interval = setInterval(function () {
            progress.value++
            if (progress.value >= 85) {
              clearInterval(second_interval)

              var ter_interval = setInterval(function () {
                progress.value++
                if (progress.value >= 99) {
                  clearInterval(ter_interval)

                  progress.value = 99.9
                }
              }, 600)
            }
          }, 260)

        }
      }, 20)
    }

    if (loadIsTrue) {
      clearInterval(interval)

      var final_interval = setInterval(function () {
        progress.value++
        if (progress.value >= 100)
          clearInterval(final_interval)
      }, 3)

      setTimeout(() => {
        progress.value = 0
        progress.style.display = 'none'
        dispatch({ type: 'ADD_ACTIVATEPROGRESSBAR', payload: false })
        dispatch({ type: 'ADD_LOADISTRUE', payload: false })
      }, 300);
    }

  }, [activateProgressBar, loadIsTrue, dispatch])

  return (
    <>
      <progress className="progress" value="0" max="100"></progress>
    </>
  )
}