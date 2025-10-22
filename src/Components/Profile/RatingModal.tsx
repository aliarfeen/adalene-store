import Modal from '../Common/Dialog'
import type { Product } from '../../Types';
import AddReviewForm from './RatingForm';

const RatingModal = ({  isOpen, onClose ,product }: { isOpen: boolean; onClose: () => void, product: Product } ) => {
  return (
    <Modal 
        isOpen={isOpen} 
        onClose={onClose}
      >
        <AddReviewForm 
        product={product}
        />
      </Modal>
  )
}

export default RatingModal
