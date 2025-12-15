import settings from '../config.js';
import commonPasswords from './commonPasswords.js';
import validator from 'validator';

class CreateUserForm {
  constructor(args) {
    this.email = args?.email;
    this.confirmEmail = args?.confirm_email;
    this.password = args?.password;
    this.confirmPassword = args?.confirm_password;
    this.secretKey = args?.secret_key;
    this.error = null;
  }

  isValid() {
    if (!this.email) {
      this.error = 'Email name is required';
      return false;
    }
    if (!validator.isEmail(this.email)) {
      this.error = 'Email is invalid';
      return false;
    }
    if (!this.confirmEmail) {
      this.error = "Please confirm the email you've entered";
      return false;
    }
    if (!validator.isEmail(this.confirmEmail)) {
      this.error = 'Email is invalid';
      return false;
    }
    if (this.email !== this.confirmEmail) {
      this.error = 'Emails do not match';
      return false;
    }
    if (!this.password) {
      this.error = 'Password is required';
      return false;
    }
    if (this.password !== this.confirmPassword) {
      this.error = "Passwords don't match";
      return false;
    }
    if (this.password.length < 9) {
      this.error = 'Password must be at least 9 characters long';
      return false;
    }
    if (commonPasswords.indexOf(this.password) > -1) {
      this.error = 'Choose a less common password';
      return false;
    }
    if (!this.secretKey) {
      this.error = 'Secret key is required';
      return false;
    }
    if (this.secretKey !== settings.SECRET_KEY) {
      this.error = 'Invalid secret key';
      return false;
    }
    return true;
  }

  asP() {
    const output = `<p>
  <input
    class="form-control"
    placeholder="Email"
    name="email"
    required
    type="text"
  />
</p>
<p>
  <input
    class="form-control"
    placeholder="Confirm Email"
    name="confirm_email"
    required
    type="text"
  />
</p>
<p>
  <input
    class="form-control"
    placeholder="Password"
    name="password"
    required
    type="password"
  />
</p>
<p>
  <input
    class="form-control"
    placeholder="Confirm Password"
    name="confirm_password""
    required
    type="password"
  />
</p>
<p>
  <input
    class="form-control"
    placeholder="Secret Sauce"
    name="secret_key"
    required
    type="password"
  />
</p>`;
    return output;
  }
}

class MobilePhoneForm {
  constructor(args) {
    this.phone = args?.mobile_number;
    this.error = null;
  }

  isValid() {
    if (!this.phone) {
      this.error = 'Moile number is required';
      return false;
    }
    if (!validator.isMobilePhone(this.phone, 'en-US')) {
      this.error = 'Invalid moile number';
      return false;
    }
    return true;
  }
}

export { CreateUserForm, MobilePhoneForm };
