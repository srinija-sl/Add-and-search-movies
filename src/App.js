import { Component } from "react"
import Popup from 'reactjs-popup'
import { v4 as uuidv4 } from 'uuid'
import {ImPlus} from 'react-icons/im'
import {AiOutlineStar, AiFillStar} from 'react-icons/ai'

import './App.css'

const stars=[1, 2, 3, 4, 5]

class App extends Component{
  state={
    moviesList: [],
    title: '',
    rating: '',
    url: '',
    select: '',
    selectPath: '',
    search: '',
    searchList: []
  }

  submitMovie = (e) => {
    e.preventDefault()
    const {title, rating, url, select} = this.state
    const newMovie = {
      id: uuidv4(),
      title,
      rating,
      url: url!=='' ? url : select 
    }
    this.setState(prevState => ({moviesList: [...prevState.moviesList, newMovie], title: '', rating: '', url: '', select: '', selectPath: ''}))
  }

  handleFileChange = (e) => {
    this.setState({selectPath: e.target.value})
    const reader = new FileReader()
    reader.onload = async()=>{
      if (reader.readyState===2){
        this.setState({select: reader.result})
      }
    }
    reader.readAsDataURL(e.target.files[0])
}

  render(){
    const {moviesList, title, rating, url, selectPath, search, searchList} = this.state
    const displayedList = search!=='' ? searchList : moviesList
    return (
      <div className='bg'>
        <div className='flex_box flex_between pt-pb-10'>
          <label htmlFor='search'>Search</label>
          <div className='plus-icon'>
            <ImPlus color='#73c1eb' />
          </div>
        </div>
        <input id='search' type='search' onChange={e => this.setState(prevState => {
          return {
            search: e.target.value,
            searchList: prevState.moviesList.filter(movie => movie.title.toLowerCase().includes(e.target.value.toLowerCase()))
          }
        })} value={search} className='search-input' /> <br />
        <div className='sort'>
          <button type='button' onClick={() => {
            moviesList.sort((movie_1, movie_2 ) => movie_2.rating>movie_1.rating ? 1 : -1)
            this.setState({moviesList})
          }} className='sort-button'>Sort</button>
        </div>
        <div className='flex_box flex_start'>
          {displayedList.map(movie => (
            <div key={movie.id}>
              <img className='image' src={movie.url} alt='movie' />
            </div>
          ))}
          <div>
            <Popup modal nested trigger={<button className='add-image image'> <ImPlus color='#73c1eb' /></button>} position="right center">
              <form className='form' onSubmit={this.submitMovie}>
                <div className='flex_box flex_between pt-pb-10'>
                  <label htmlFor='title' className='heading'>Title</label>
                  <input className='heading-input' id='title' value={title} onChange={e => this.setState({title: e.target.value})} />
                </div>
                <div className='flex_box flex_between pt-pb-10'>
                  <label htmlFor='rating' className='heading'>Rating</label>
                    <div className='heading-input'>
                      {stars.map(star => <button key={star} className='sort-button' onClick={() => this.setState({rating: star})} type='button'>
                        {rating<star || rating==='' ? <AiOutlineStar /> : <AiFillStar color='yellow' />}
                      </button>)}
                    </div>
                </div>
                <h3 className='image-heading'>Image:</h3>
                <div className='pl-20'>
                  <div className='flex_box flex_between pt-pb-10'>
                    <label htmlFor='url' className='heading'>URL</label>
                    <input className='heading-input' id='url'  value={url} onChange={e => this.setState({url: e.target.value})} />
                  </div>
                  <p className='or'>OR</p>
                  <div className='flex_box flex_between pt-pb-10'>
                    <label htmlFor='select' className='heading'>Select</label>
                    <input className='file' accept='image/*' type='file' id='select' onChange={this.handleFileChange} />
                    <label htmlFor='select' className='heading-input select'>{selectPath}</label>
                  </div>
                </div>
                <div className='submit'><button type='submit'>Submit Movie</button></div>
              </form>
            </Popup>
          </div>
        </div>
      </div>
    )
  }
}

export default App