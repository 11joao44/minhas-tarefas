import BotaoAdicionar from '../../components/BotaoAdicionar'
import Sidebar from '../../containers/BarraLateral'
import ToDoList from '../../containers/ToDoList'

const Home = () => (
  <>
    <Sidebar mostrarFiltros />
    <ToDoList />
    <BotaoAdicionar />
  </>
)

export default Home
