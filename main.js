//WINDOW EVENT LISTENERS
//WHEN ALL IMG SCRIPTS LINKS HAVE BEEN LOADER
//HIDE PRELOADER
eventListeners();
function eventListeners(){
  const ui = new UI()
  //preloader
  window.addEventListener('load', function() {
    ui.hidePreloader();
  });
  //NAV BUTTON function
  document.querySelector('.navBtn').addEventListener('click',function(){
    ui.showNav();
  });
  //CONTROL THE VIDEO(ON-OFF)
  document.querySelector('.video_switch').addEventListener('click',function(){
    ui.videoControls();
  });
  //FORM SUBMIT
  document.querySelector('.drink-form').addEventListener('submit',function(event){
    event.preventDefault();
    const name = document.querySelector('.input-name').value;
    const lastname = document.querySelector('.input-lastname').value;
    const email = document.querySelector('.input-email').value;

    let value = ui.checkEmpty(name, lastname, email)

    if(value){
      let customer = new Customer(name,lastname,email)
      console.log(customer);
      ui.addCustomer(customer)
      ui.showFeedback('custumer added to the list', 'success')
      ui.clearFields()
    }
    else{
      ui.showFeedback('some form values are empty', 'error')
    }
  })
  //WORK MODAL SHOW
  const links = document.querySelectorAll('.work-item-icon');


    links.forEach(function(item){
      item.addEventListener('click',function(event){
        ui.showModal(event)
      })
    })
  //WORK MODAL CLOSE display
  document.querySelector('.work-modal-close').addEventListener('click',function(){
    ui.closeModal();
  });

  ////SHOW MODAL 2 ( KAD PASPAUDUS ANT PACIO SEARCH ICON ATIDARYTU DIDELY IMG)
  const link = document.querySelectorAll('.fas fa-search');


    links.forEach(function(item){
      item.addEventListener('click',function(event){
        ui.showModal(event)
      })
    })



}







//construction function
function UI(){

}
//Hide Preloader
UI.prototype.hidePreloader = function(){
  document.querySelector('.preloader').style.display="none";
};
//Show Nav
UI.prototype.showNav = function(){
  document.querySelector('.nav').classList.toggle('nav_show');
};
//CONTROL THE VIDEO(ON-OFF)
UI.prototype.videoControls = function(){
  let btn = document.querySelector('.video_switch-btn');
  if (!btn.classList.contains('btn_slide')){
    btn.classList.add('btn_slide');
    document.querySelector('.video_item').pause();
  }
  else{
    btn.classList.remove('btn_slide');
    document.querySelector('.video_item').play();
  }
};
 //CHECK FOR EMPTY FORM VALUES
 UI.prototype.checkEmpty = function(name, lastname, email){
   let result;
   if(name === '' || lastname === '' || email === ''){
   result = false;
 }
 else{
   result = true;
 }
 return result;
};

UI.prototype.showFeedback = function(text, type){
  const feedback = document.querySelector('.drink-form-feedback');
  if (type === 'success'){
    feedback.classList.add('success');
    feedback.innerText = text;
    this.removeAlert('success');
  }
    else if (type === 'error'){
      feedback.classList.add('error');
      feedback.innerText = text;
      this.removeAlert('error');
    }
  };
// REMOVE ALERT TIMEOUT
UI.prototype.removeAlert = function(type){
  setTimeout(function(){
    document.querySelector('.drink-form-feedback').classList.remove(type);
  }, 3000);
};

//ADD COSTUMER
UI.prototype.addCustomer = function(customer){
  const images = [1,2,3,4,5];
  let random = Math.floor(Math.random()*images.length);
  const div = document.createElement('div');
  div.classList.add('person');
  div.innerHTML = `<img src="img/person-${random}.jpeg" class="person-thumbnail" alt="">
  <h4 class="person-name">${customer.name}</h4>
  <h4 class="person-last-name">${customer.lastname}</h4>`
  document.querySelector('.drink-card-list').appendChild(div)
}
//clear fields
UI.prototype.clearFields = function(){
  document.querySelector('.input-name').value = '';
  document.querySelector('.input-lastname').value = '';
  document.querySelector('.input-email').value = '';
}

function Customer(name,lastname,email){
  this.name = name,
  this.lastname = lastname,
  this.email = email;
}

//SHOW MODAL(WORK)
UI.prototype.showModal = function(event){
  event.preventDefault();
  if(event.target.parentElement.classList.contains('work-item-icon'));
  let id = event.target.parentElement.dataset.id

  const modal = document.querySelector('.work-modal');
  const modalItem = document.querySelector('.work-modal-item');

  modal.classList.add('work-modal-show');
  modalItem.style.backgroundImage = `url(img/work-${id}.jpeg)`
};


//SHOW MODAL 2 ( KAD PASPAUDUS ANT PACIO SEARCH ICON ATIDARYTU DIDELY IMG)
UI.prototype.showModal = function(event){
  event.preventDefault();
  if(event.target.parentElement.classList.contains('fas fa-search'));
  let id = event.target.parentElement.dataset.id

  const modal = document.querySelector('.work-modal');
  const modalItem = document.querySelector('.work-modal-item');

  modal.classList.add('work-modal-show');
  modalItem.style.backgroundImage = `url(img/work-${id}.jpeg)`
};
////SHOW MODAL 2 ( KAD PASPAUDUS ANT PACIO SEARCH ICON ATIDARYTU DIDELY IMG)


//CLOSE MODAL(WORK)
UI.prototype.closeModal = function(){
  document.querySelector('.work-modal').classList.remove('work-modal-show')
}
