import React, { Component } from 'react';
import VideoPlayer from '../VideoPlayer';
import favTrue from '../../assets/fav-true.svg';
import favFalse from '../../assets/fav-false.svg';
import { connect } from 'react-redux';
import { controlFavorites, contentStatus } from '../../actions';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import './TitleCard.css';

export class TitleCard extends Component {
  constructor() {
    super()
    this.state = {
      play: false,
    }
  }

  mouseEnter = () => {
    this.setState( { play: true } );
  }

  mouseLeave = () => {
    this.setState( { play: false } );
  }

  toggleFavorite = () => {
    if (!this.props.user.id) {
      this.props.contentStatus(`Login to add Favorites`)
      return
    }
    const movie = {
      movie_id: this.props.id,
      user_id: this.props.user.id,
      title: this.props.title,
      poster_path: this.props.poster,
      release_date: this.props.release,
      vote_average: this.props.rating,
      overview: this.props.overview,
    }
    this.props.controlFavorites(movie)
  }

  render() {
    const { image, video, title, runtime, rating, overview, mpaa, favorite, id } = this.props;
    const { play } = this.state;
    return(
      <div className='title-card fade' 
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
      >
        {
          play &&
        <div className='foreground'>
            <div className='info-section'>
              <NavLink to={`/${id}`} className='title-page-link'>
                <div>
                  <h3 className='movie-title'>{title}</h3>
                  <p className='movie-specs'>
                    <span className='rating'>{rating}</span>
                    <span className='mpaa'>{mpaa.certification}</span>
                    {runtime}
                  </p>
                  <p className='movie-tagline'>{overview.slice(0, 60)}...</p>
                </div>
              </NavLink>
            </div>
          <div className='favorite-section'>
            <img className='favorite-btn'
              onClick={this.toggleFavorite}
              src={favorite ? favTrue : favFalse}
              alt='favorite button'
            />
          </div>
        </div>
        }
        {
          !play &&
          <div className='foreground'>
            <div className='info-section'>
              <div></div>
            </div>
            <div className='favorite-section'>
              {
                favorite &&
              <img className='favorite-btn'
                onClick={this.toggleFavorite}
                src={favTrue}
                alt='favorite button'
              />
              }
            </div>
          </div>
        }
        <VideoPlayer image={image}
          feature={false}
          url={video[0].key}
          play={play}
        />
      </div> 
    )
  } 
}

export const mapStateToProps = (state) => ({
  user: state.user
})

export const mapDispatchToProps = (dispatch) => ({
  controlFavorites: (movie) => dispatch(controlFavorites(movie)),
  contentStatus: (status) => dispatch(contentStatus(status))
})

const { object, func } = PropTypes;
TitleCard.propTypes = {
  user: object,
  controlFavorites: func,
  contentStatus: func
};


export default connect (mapStateToProps, mapDispatchToProps)(TitleCard);
