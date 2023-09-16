
import axios from 'axios';
 
const refs = {
  btnTest: document.querySelector('.test-click-btn'),
  modalWindow: document.querySelector('.modal-receipt'),
  modalReceiptBackdrop: document.querySelector('.modal-receipt-backdrop'),
  }

const fetchWholeReceipt = async (id) => {
  const response = await axios.get(`https://tasty-treats-backend.p.goit.global/api/recipes/${id}`)
return response.data
      
}

refs.btnTest.addEventListener('click', onBtnTestClick)
function onBtnTestClick() {
  refs.modalReceiptBackdrop.classList.remove('is-hidden')
  window.addEventListener('keydown', onEscKeyPress)
  function onEscKeyPress(event) {
    if (event.code === "Escape") {
      refs.modalReceiptBackdrop.classList.add('is-hidden')
      window.removeEventListener('keydown', onEscKeyPress)
    }
  }
  refs.modalReceiptBackdrop.addEventListener('click', onBackdropClick)
  function onBackdropClick(event) {
    if (event.target === event.currentTarget) {
      refs.modalReceiptBackdrop.classList.add('is-hidden')
      window.removeEventListener('keydown', onEscKeyPress)
    }
  }

  fetchWholeReceipt('6462a8f74c3d0ddd28897fba')
    .then((data) => {
           
      if (data.length === 0) {
        console.log(`Error`)
        return
      }
                         
      refs.modalWindow.innerHTML = createModalReceiptMarkup(data)


      function renderVideo({ youtube, thumb, title }) {
        if (youtube) {
          return `<div class="modal-receipt-video-wrapper"></div><video class="mobile-recipe-video"
  src="${youtube}"
  poster="${thumb}"
  controls
  autoplay
  loop
  preload="auto"
></video><div/>`
        }
        return `<div class="modal-receipt-thumb-wrapper"><img class="mobile-recipe-img" src="${thumb}" alt="${title}" /><div/>`
      }
            
            
      function renderIngridients(ingridients) {
        return ingridients.map(({ measure, name }) => `
    <div class="ingridient-wrapper"><div class="modal-receipt-ingr-name">${name}</div><div class="modal-receipt-ingr-measure">${measure}</div></div>`).join('')
      }

      function renderTags(tags) {
        return tags.map((tag) => `   
      <button class="modal-receipt-tag-btn" type="button"> #${tag}</button>
    `).join('')
      }
            

      function createModalReceiptMarkup({ title, instructions, rating, time }) {

        const markup = `<button class="modal-receipt-close-btn" type="button" data-modal-close>
<svg width="20" height="20" viewBox="0 0 20 20" fill="red" xmlns="http://www.w3.org/2000/svg">
<path d="M15 5L5 15" stroke="#050505" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5 5L15 15" stroke="#050505" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
    </button> ${renderVideo(data)
          } <h1 class="modal-receipt-title">${title}</h1>
<div class="modal-receipt-rating-time-wrapper">
  <div class="modal-receipt-rating-stars-wrapper">
  <p class="modal-recipe-rating-number">${Math.round(rating)}</p></div>${renderRatingStarts(Math.round(rating))}
  <div class="modal-receipt-cooking-time-wrapper">
    <p class="modal-receipt-cooking-time">${time} min</p>
  </div>
</div>  
    <div class="ingridients-table">${renderIngridients(data.ingredients)}</div>
    <div class="tags-btn-wrapper"> ${renderTags(data.tags)} </div>

    <p class="modal-receipt-process-description"> ${instructions} </p>
    <div class="modal-receipt-btn-wrapper">
      <button class="modal-receipt-add-to-favorite-btn" type="button">Add to favorite</button>
      <button class="modal-receipt-give-rating" type="button">Give a rating</button>
    </div>`
              
        return markup
       
      }

      const modalReceiptCloseBtn = document.querySelector('.modal-receipt-close-btn');
   
      modalReceiptCloseBtn.addEventListener('click', onModalCloseBtnClick);
      function onModalCloseBtnClick() {
        refs.modalReceiptBackdrop.classList.add('is-hidden')
      }



      function renderRatingStarts(rating) {
        let starsMarkup = '';
        const starOrange = `<div class="rating-stars-wrapper">
<svg class="rating-receipt-star.colored" width="14" height="13" fill="orange" xmlns="http://www.w3.org/2000/svg"><path d="M6.049.927c.3-.921 1.603-.921 1.902 0l.845 2.6a1 1 0 0 0 .951.692h2.735c.969 0 1.371 1.24.588 1.809l-2.213 1.607a1 1 0 0 0-.363 1.118l.845 2.601c.3.921-.755 1.688-1.539 1.118l-2.212-1.607a1 1 0 0 0-1.176 0L4.2 12.472c-.784.57-1.838-.197-1.539-1.118l.845-2.6a1 1 0 0 0-.363-1.119L.93 6.028c-.783-.57-.38-1.81.588-1.81h2.735a1 1 0 0 0 .95-.69l.846-2.6Z" fill=""/></svg> </div>`
        console.log(starsMarkup)
        const starGrey = `<div class="rating-stars-wrapper">
<svg class="rating-receipt-star" width="14" height="13" fill="grey" xmlns="http://www.w3.org/2000/svg"><path d="M6.049.927c.3-.921 1.603-.921 1.902 0l.845 2.6a1 1 0 0 0 .951.692h2.735c.969 0 1.371 1.24.588 1.809l-2.213 1.607a1 1 0 0 0-.363 1.118l.845 2.601c.3.921-.755 1.688-1.539 1.118l-2.212-1.607a1 1 0 0 0-1.176 0L4.2 12.472c-.784.57-1.838-.197-1.539-1.118l.845-2.6a1 1 0 0 0-.363-1.119L.93 6.028c-.783-.57-.38-1.81.588-1.81h2.735a1 1 0 0 0 .95-.69l.846-2.6Z" fill=""/></svg> </div>`

        for (let i = 1; i <= 5; i += 1) {
          starsMarkup += starOrange;
        }
        for (let i = 1; i <= (5 - rating); i += 1) {
          starsMarkup += starGrey;
        }
               return starsMarkup
      }
    
      // Додавання до локального сховища
      const addToFavBtn = document.querySelector('.modal-receipt-add-to-favorite-btn')
           
      addToFavBtn.addEventListener('click', onAddToFavBtnClick);
      function onAddToFavBtnClick() {
        return localStorage.setItem("favourite-item", JSON.stringify(data))
      }
    })
}