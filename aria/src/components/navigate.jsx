import {Link} from 'react-router-dom'

export function Navigation(){
  return(
    <>
      <h4>ARIA - ROBOT HDI</h4>
      <Link to='/crud'>Crud</Link>
      <br />
      <Link to='/views'>Views</Link>
    </>
  )
}