import settings from '../config.js';
import commonPasswords from './commonPasswords.js'

class CreateUserForm {
  constructor(args) {
    this.firstName = args?.first_name;
    this.lastName = args?.last_name;
    this.password = args?.password;
    this.confirmPassword = args?.confirm_password;
    this.secretKey = args?.secret_key;
    this.error = null;
  }

  isValid() {
    if (!this.firstName) {
      this.error = 'First name is required';
      return false;
    }
    if (!this.lastName) {
      this.error = 'Last name is required';
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
    placeholder="First Name"
    name="first_name"
    required
    type="text"
  />
</p>
<p>
  <input
    class="form-control"
    placeholder="Last Name"
    name="last_name"
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

export default CreateUserForm;
