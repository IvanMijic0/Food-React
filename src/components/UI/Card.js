import s from './Card.module.css'

const Card = props => {
  return <div className={ s.card }>{ props.children }</div>
}

export default Card