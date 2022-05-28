/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

const stripe = Stripe(
  'pk_test_51L44idEr6akO7sGOYRI6T6DZlTNc9kQNXR6wYgXcg9cae5KVCDjMs73UWLuLe3g5db9xLZ1XIQvfzhru1yWdmXVy00zlmZ70sH'
);

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
