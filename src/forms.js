class CreateUserForm {
  constructor(args) {
    this.firstName = args?.firstName;
    this.lastName = args?.lastName;
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
