import React, {PropTypes} from 'react';
import avatar from '../../img/avatar.jpeg'
class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1 className="text-center mt-5">Andrei's Profile</h1>
          <img src={avatar} className="img-thumbnail mx-auto d-block" alt="..."/>
          </div>
        </div>
      </div>
    );
  }
}
Profile.propTypes = {
};

export default Profile
