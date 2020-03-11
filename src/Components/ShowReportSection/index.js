import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './styles.css'
import api from '../../services/api'
import btnClear from '../../assets/excluir4.png'

export default function ShowReportSection() {

  const dispatch = useDispatch()

  const { formattedDate } = useSelector(state => state.selectedDate)
  const { orderServices } = useSelector(state => state.serviceRecord)
  const { loadServices } = useSelector(state => state.serviceRecord)

  var [expenseTotal, setExpenseTotal] = useState(0)

  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

  useEffect(() => {
    let expenseTotal = 0
    let expenseOrderService = 0

    for (let i in orderServices) {
      expenseOrderService = (orderServices[i].distance_service * 0.6 + orderServices[i].parking_service + orderServices[i].toll_service)
      expenseTotal = expenseTotal + expenseOrderService
    }
    setExpenseTotal(expenseTotal.toFixed(2))
  }, [orderServices])

  async function deleteOrderService(idService) {

    await api.delete('/service', {
      headers: {
        _id: idService,
      }
    })
      .then(() => {
        dispatch({ type: 'SET_LOADSERVICE', payload: loadServices ? false : true })
      })
  }

  async function editOrderService(idService) {
    dispatch({
      type: 'ADD_SELECTEDSERVICE', payload: orderServices.filter(element => {
        return (element._id === idService)
      })
    })
  }

  return (
    <>
      <section className="section-center">
        <div className="section-center__grid">
          <header className="title section-center__title">
            {new Date(formattedDate).getDate() + ' de ' + (months[new Date(formattedDate).getMonth()]) + ' de ' + new Date(formattedDate).getFullYear()}
            <div className="rodape-total    ">
              <label className="section-center__label-total">Total:</label>
              <div className="despesaTotal">R$ {expenseTotal}</div>
            </div>
          </header>

          <div className="section-center__called">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th className="table__th" width="23%">Loja</th>
                  <th className="table__th" width="20%">Nº Chamado</th>
                  <th className="table__th col-qtd" width="27%">Qtd Chamados</th>
                  <th className="table__th" width="28%">Despesas</th>
                </tr>
              </thead>
              <tbody>
                {orderServices ? orderServices.map(e => (
                  
                  <tr id={e._id} key={e._id} onClick={() => editOrderService(e._id)} className="table__tr">
                    <th>{e.id_customer}</th>
                    <th>{e.id_service}</th>
                    <th className="col-qtd">{e.qtd_service}</th>
                    <th className="table__col-excluir">
                      R$ {e.distance_service > 0 || e.parking_service > 0 || e.toll_service > 0
                        ? (e.distance_service * 0.6 + e.parking_service + e.toll_service).toFixed(2)
                        : ('0.00')}
                      <img onClick={() => deleteOrderService(e._id)} src={btnClear} width="8px" alt="a" />
                    </th>
                  </tr>
                )) : (
                    <></>
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  )
}