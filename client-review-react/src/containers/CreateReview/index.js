import React, { Component } from 'react';
import api from '../../utils/api.service';

class CreateReview extends Component {
  state = {
    review: '',
    rating: 0,
    imageFileInfo: '',
    image: ''
  };

  onInputChangeHandler = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onImageChangeHandler = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        imageFileInfo: file,
        image: reader.result
      });
    };

    reader.readAsDataURL(file);
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    // validation here - not important right now

    const {
      review,
      rating,
      image
    } = this.state;

    console.log(this.state)

    api.post('/reviews', {
      review,
      rating: +rating,
      image
    }).then( 
      data => {
        console.log(data);
    }).catch(
      err => console.log(err)
    );

  };

  render() {
    return (
      <div className="center_div">
        Review: <input type="text" name="review" onChange={this.onInputChangeHandler} /> <br />
        Rating: <input type="number" min="1" max="5" name="rating" onChange={this.onInputChangeHandler} />
        <input type="file" accept="image/png, image/jpeg" onChange={this.onImageChangeHandler} /> <br /><br />
        <input type="submit" onClick={this.onSubmitHandler} />
      </div>
    );
  }
};

export default CreateReview;