import ReactDOM from 'react-dom';
import s from './Modal.module.css';

const Backdrop = props => {
  return <div className={ s.backdrop } onClick={ props.onClose }/>;
};

const ModalOverlay = props => {
  return <div className={ s.modal }>
    <div>{ props.children }</div>
  </div>;
};

const portalElement = document.getElementById('overlays');

const Modal = props => {
  return <>
    { ReactDOM.createPortal(<Backdrop onClose={ props.onClose }/>,
      portalElement) }
    { ReactDOM.createPortal(<ModalOverlay>{ props.children }</ModalOverlay>,
      portalElement) }
  </>;
};

export default Modal;