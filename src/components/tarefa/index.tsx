/* eslint-disable react-hooks/rules-of-hooks */
import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import * as S from './styles'
import * as enums from '../../utils/enums/Tarefas'
import { remover, editar, alteraStatus } from '../../store/reducers/tarefas'
import TarefaClass from '../../models/Tarefa'
import { Botao, Salvar } from '../../styles'

type Props = TarefaClass

const tarefa = ({ descricao, prioridade, status, titulo, id }: Props) => {
  const dispatch = useDispatch()
  const [emEdicao, setEmEdicao] = useState(false)
  const [desc, setDesc] = useState('')

  useEffect(() => {
    if (descricao.length > 0) {
      setDesc(descricao)
    }
  }, [descricao])

  function cancelarEdicao() {
    setEmEdicao(false)
    setDesc(descricao)
  }

  function alteraStatusTarefa(evento: ChangeEvent<HTMLInputElement>) {
    dispatch(alteraStatus({ id, finalizado: evento.target.checked }))
  }

  return (
    <S.Card>
      <label htmlFor={titulo}>
        <input
          type="checkbox"
          id={titulo}
          checked={status === enums.Status.CONCLUIDA}
          onChange={alteraStatusTarefa}
        />
        <S.Titulo>
          {emEdicao && <em>Editando: </em>}
          {titulo}
        </S.Titulo>
      </label>
      <S.Tag parametro="prioridade" prioridade={prioridade}>
        {prioridade}
      </S.Tag>
      <S.Tag parametro="status" status={status}>
        {status}
      </S.Tag>
      <S.Descricao
        disabled={!emEdicao}
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <S.BarraAcao>
        {emEdicao ? (
          <>
            <Salvar
              onClick={() => {
                dispatch(
                  editar({
                    descricao,
                    id,
                    prioridade,
                    status,
                    titulo
                  })
                )
                setEmEdicao(false)
              }}
            >
              Salvar
            </Salvar>
            <S.cancelarEremover onClick={cancelarEdicao}>
              Cancelar
            </S.cancelarEremover>
          </>
        ) : (
          <>
            <Botao onClick={() => setEmEdicao(true)}>Editar</Botao>
            <S.cancelarEremover onClick={() => dispatch(remover(id))}>
              Remover
            </S.cancelarEremover>
          </>
        )}
      </S.BarraAcao>
    </S.Card>
  )
}

export default tarefa
