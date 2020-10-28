export const formMixin = {
  data() {
    return {
      errors: []
    };
  },
  methods: {
    validateState(name) {
      if (Array.isArray(this.errors)) {
        for (let error of this.errors) {
          if (error.field === name) {
            return false;
          }
        }
      }
      return null;
    },
    errorMessages(name) {
      if (Array.isArray(this.errors)) {
        for (let error of this.errors) {
          if (error.field === name) {
            return error.messages;
          }
        }
      }
      return [];
    }
  }
};

export const toastMixin = {
  data() {
    return {
      settings: {
        template:
          '<div data-notify="container" class="pulse pulse-white alert alert-{0}" role="alert">' +
          '<span class="pulse-ring"></span>' +
          '<button type="button" aria-hidden="true" class="close" data-notify="dismiss"></button>' +
          '<div class="alert-icon float-left mr-4">' +
          '<span class="svg-icon svg-icon-light svg-icon-3x">' +
          '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">\n' +
          '    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n' +
          '        <rect x="0" y="0" width="24" height="24"/>\n' +
          '        <path d="M2.56066017,10.6819805 L4.68198052,8.56066017 C5.26776695,7.97487373 6.21751442,7.97487373 6.80330086,8.56066017 L8.9246212,10.6819805 C9.51040764,11.267767 9.51040764,12.2175144 8.9246212,12.8033009 L6.80330086,14.9246212 C6.21751442,15.5104076 5.26776695,15.5104076 4.68198052,14.9246212 L2.56066017,12.8033009 C1.97487373,12.2175144 1.97487373,11.267767 2.56066017,10.6819805 Z M14.5606602,10.6819805 L16.6819805,8.56066017 C17.267767,7.97487373 18.2175144,7.97487373 18.8033009,8.56066017 L20.9246212,10.6819805 C21.5104076,11.267767 21.5104076,12.2175144 20.9246212,12.8033009 L18.8033009,14.9246212 C18.2175144,15.5104076 17.267767,15.5104076 16.6819805,14.9246212 L14.5606602,12.8033009 C13.9748737,12.2175144 13.9748737,11.267767 14.5606602,10.6819805 Z" fill="#000000" opacity="0.3"/>\n' +
          '        <path d="M8.56066017,16.6819805 L10.6819805,14.5606602 C11.267767,13.9748737 12.2175144,13.9748737 12.8033009,14.5606602 L14.9246212,16.6819805 C15.5104076,17.267767 15.5104076,18.2175144 14.9246212,18.8033009 L12.8033009,20.9246212 C12.2175144,21.5104076 11.267767,21.5104076 10.6819805,20.9246212 L8.56066017,18.8033009 C7.97487373,18.2175144 7.97487373,17.267767 8.56066017,16.6819805 Z M8.56066017,4.68198052 L10.6819805,2.56066017 C11.267767,1.97487373 12.2175144,1.97487373 12.8033009,2.56066017 L14.9246212,4.68198052 C15.5104076,5.26776695 15.5104076,6.21751442 14.9246212,6.80330086 L12.8033009,8.9246212 C12.2175144,9.51040764 11.267767,9.51040764 10.6819805,8.9246212 L8.56066017,6.80330086 C7.97487373,6.21751442 7.97487373,5.26776695 8.56066017,4.68198052 Z" fill="#000000"/>\n' +
          "    </g>\n" +
          "</svg>" +
          "</span>" +
          "</div>" +
          '<div class="alert-text">' +
          '<span data-notify="title" class="font-weight-bolder">{1}</span>' +
          '<span data-notify="message" class="font-weight-bold mt-6">{2}</span>' +
          "</div>" +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-animated bg-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          "</div>" +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          "</div>",
        placement: {
          from: "top",
          align: "right"
        },
        delay: 3000,
        timer: 2000,
        spacing: 10,
        offset: {
          y: 30,
          x: 30
        },
        animate: {
          enter: "animate__animated animate__bounceInRight",
          exit: "animate__animated animate__bounceOutRight"
        }
      }
    };
  },
  methods: {
    notifySuccess(message, title = null) {
      this.settings.type = "success";

      let content = {
        message: message
      };
      if (title !== null) {
        content.title = title;
      }

      window.$.notify(content, this.settings);
    },

    notifyError(message, title = null) {
      this.settings.type = "danger";

      let content = {
        message: message
      };
      if (title !== null) {
        content.title = title;
      }

      window.$.notify(content, this.settings);
    },

    notifyWarning(message, title = null) {
      this.settings.type = "warning";

      let content = {
        message: message
      };
      if (title !== null) {
        content.title = title;
      }

      window.$.notify(content, this.settings);
    }
  }
};
