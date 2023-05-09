import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import FilterCard from '../../components/FiltroCard'
import { RootReducer } from '../../store'
import { alterarTermo } from '../../store/reducers/filtro'

import * as S from './styles'
import * as enums from '../../utils/enums/Tarefas'
import { Botao, Campo } from '../../styles'

type Props = {
  mostrarFiltros: boolean
}

const Sidebar = ({ mostrarFiltros }: Props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { termo } = useSelector((state: RootReducer) => state.filtro)

  return (
    <S.Aside>
      <div>
        {mostrarFiltros ? (
          <>
            <Campo
              type="text"
              placeholder="Buscar"
              value={termo}
              onChange={(evento) => dispatch(alterarTermo(evento.target.value))}
            />
            <S.Filter>
              <FilterCard
                valor={enums.Status.PENDENTE}
                criterio="status"
                legenda="pendentes"
              />
              <FilterCard
                valor={enums.Status.CONCLUIDA}
                criterio="status"
                legenda="concluidas"
              />
              <FilterCard
                valor={enums.Prioridade.URGENTE}
                criterio="prioridade"
                legenda="urgentes"
              />
              <FilterCard
                valor={enums.Prioridade.iMPORTANTE}
                criterio="prioridade"
                legenda="importantes"
              />
              <FilterCard
                valor={enums.Prioridade.NORMAL}
                criterio="prioridade"
                legenda="normal"
              />
              <FilterCard criterio="todas" legenda="todas" />
            </S.Filter>
          </>
        ) : (
          <Botao onClick={() => navigate('/')}>Voltar a lista de tarefas</Botao>
        )}
      </div>
    </S.Aside>
  )
}

export default Sidebar
