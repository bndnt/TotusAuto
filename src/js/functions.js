class Modals {
  constructor() {
    this.init();
    this.addListenersOpen();
    this.addListenersClose();
    this.addListenerHash();
  }

  init() {
    const modal = document.querySelector(`[data-modal="${window.location.hash}"]`);

    if (window.location.hash && modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      document.querySelectorAll(`[data-modal]`).forEach((modal) => {
        modal.classList.remove('active');
        document.body.style.overflow = 'visible';
      });
    }
  }

  addListenersOpen() {
    document.querySelectorAll('a[data-modal-open]').forEach((trigger) => {
      trigger.addEventListener('click', this.openModal.bind(this));

      console.log(11);
    });
  }

  addListenersClose() {
    document.querySelectorAll('[data-modal-close]').forEach((trigger) => {
      trigger.addEventListener('click', this.closeModal.bind(this));
    });
  }

  addListenerHash() {
    window.addEventListener('hashchange', this.init.bind(this));
  }

  openModal(event) {
    event.preventDefault();

    const trigger = event.target.closest('[data-modal-open]');
    const modal = document.querySelector(`[data-modal="${trigger.hash}"]`);

    if (modal) {
      modal.classList.add('active');
      const scrollWidth = window.innerWidth - document.body.offsetWidth;

      if (scrollWidth) {
        document.querySelectorAll('[data-modal-fixed]').forEach((element) => {
          element.style.paddingRight = `${scrollWidth}px`;
        });
      }

      document.body.style.overflow = 'hidden';
    } else {
      console.error(`The modal window by id '${id}' not found!`);
    }

    window.location.hash = trigger.hash;
  }

  closeModal(event) {
    event.preventDefault();

    const modal = event.target.closest('[data-modal]');

    if (modal) {
      modal.classList.remove('active');

      document.querySelectorAll('[data-modal-fixed]').forEach((element) => {
        element.style.paddingRight = '0';
      });

      document.body.style.overflow = 'visible';

      history.pushState('', document.title, window.location.pathname + window.location.search);
    } else {
      console.error(`The modal window by id '${id}' not found!`);
    }
  }
}

new Modals();

new (class Tabs {
  constructor() {
    this.$wrapper;
    this.$triggers;
    this.$body;
    this.init();
  }

  init() {
    document.querySelectorAll('[data-tabs]').forEach((wrapper) => {
      this.$wrapper = wrapper;
      this.$triggers = [...wrapper.querySelector('[data-triggers]').children];
      this.$body = [...wrapper.querySelector('[data-body]').children];
      this.$triggers[0].classList.add('active');
      this.$body[0].classList.add('active');
      this.update();
      this.addListenerClick();
      this.addListenerHash();
    });
  }

  update(event) {
    const trigger = this.$wrapper.querySelector(`a[href="${window.location.hash}"]`);
    const content = this.$wrapper.querySelector(`[data-id="${window.location.hash}"]`);

    if (window.location.hash && trigger && content) {
      this.$triggers.forEach((trigger) => {
        trigger.classList.remove('active');
      });

      this.$body.forEach((content) => {
        content.classList.remove('active');
      });

      trigger.classList.add('active');
      content.classList.add('active');
    }

    sessionStorage.setItem('last-url', event?.oldURL);
  }

  addListenerClick() {
    this.$triggers.forEach((trigger) => {
      trigger.addEventListener('click', this.changeTab.bind(this));
    });
  }

  addListenerHash() {
    window.addEventListener('hashchange', this.update.bind(this));
  }

  changeTab(event) {
    event.preventDefault();

    const trigger = event.target.closest('a[href^="#"]');
    const content = this.$wrapper.querySelector(`[data-id="${trigger.hash}"]`);

    this.$triggers.forEach((trigger) => {
      trigger.classList.remove('active');
    });

    this.$body.forEach((content) => {
      content.classList.remove('active');
    });

    trigger.classList.add('active');
    content.classList.add('active');

    window.location.hash = trigger.hash;
  }
})();
