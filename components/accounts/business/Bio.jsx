

function SignUp({ formData, setFormData }) {
  return (
    <>
      {/* <Sideavatar
        header="You just a few steps from becoming a creator."
        paragraph="Start your account set up in minutes, save time and money. "
        image={Images.D2}
      /> */}
      <div className="other-info-container">

        <input
          type="text"
          name="username"
          id=""
          placeholder="Username"
          maxLength={50}
          value={formData.username}
          onChange={(e) => {
            setFormData({ ...formData, username: e.target.value });
          }}
        />

        <div className="radio_parent">
          <label htmlFor="male" className="radio">
            <input
              type="radio"
              name="gender"
              id="male"
              value={formData.gender}
              onChange={(e) => {
                setFormData({ ...formData, gender: e.target.value });
              }}
            />
            <span>Male</span>
          </label>
          <label htmlFor="female" className="radio">
            <input
              type="radio"
              name="gender"
              id="female"
              value={formData.gender}
              onChange={(e) => {
                setFormData({ ...formData, gender: e.target.value });
              }}
            />
            <span>Female</span>
          </label>
        </div>
        <input
          type="date"
          name="date_of_birth"
          id=""
          placeholder="Date of birth"
          value={formData.date_of_birth}
          onChange={(e) => {
            setFormData({ ...formData, date_of_birth: e.target.value });
          }}
        />
        <input
          type="text"
          name="nationality"
          id=""
          placeholder="Nationality"
          value={formData.nationality}
          onChange={(e) => {
            setFormData({ ...formData, nationality: e.target.value });
          }}
        />
        <div className="">
          <input
            type="text"
            placeholder="Address"
            value={formData.address}
            name="address"
            onChange={(e) => {
              setFormData({ ...formData, address: e.target.value });
            }}
          />
          <input
            type="tel"
            placeholder="Mobile"
            value={formData.mobile}
            name="mobile"
            onChange={(e) => {
              setFormData({ ...formData, mobile: e.target.value });
            }}
          />
        </div>
      </div>
    </>
  );
}

export default SignUp;
