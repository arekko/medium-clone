import React, { Component } from 'react'
import MediumEditor from 'medium-editor'
import axios from 'axios'
import EditorHeader from './EditorHeader/EditorHeader'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import './editor.css'

class Editor extends Component {
  constructor () {
    super()
    this.state = {
      title: '',
      text: '',
      description: '',
      imgSrc: null,
      loading: false
    }
    
  }

  componentDidMount () {
    const editor = new MediumEditor(/*dom, */".medium-editable",{
      autoLink: true,
      delay: 1000,
      targetBlank: true,
      toolbar: {
        buttons: [
          'bold',
          'italic',
          'quote',
          'underline',
          'anchor',
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'strikethrough',
          'subscript',
          'superscript',
          'pre',
          'image',
          'html',
          'justifyCenter'
        ],
        diffLeft: 25,
        diffTop: 10,
      },
      anchor: {
        placeholderText: 'Type a link',
        customClassOption: 'btn',
        customClassOptionText: 'Create Button'
      },
      paste: {
        cleanPastedHTML: true,
        cleanAttrs: ['style', 'dir'],
        cleanTags: ['label', 'meta'],
        unwrapTags: ['sub', 'sup']
      },
      anchorPreview: {
        hideDelay: 300
      },
      placeholder: {
        text: 'Tell your story...'
      }
    })
    editor.subscribe('editableInput', (ev, editable) => {
      if(typeof document !== 'undefined')
        this.setState({
          title: document.getElementById('editor-title').value,
          text: editor.getContent(0),
          description: `${editor.getContent(0).substring(0,30).toString()}...`
        })
    })
  }

  publishStory = () => {
    console.log(this.props.auth.user._id)
    this.setState({
      loading: true
    })
    const _url = process.env.NODE_ENV === 'production' ? "/api/" : "http://localhost:5000/api/"
    const formdata = new FormData()
    formdata.append('text', this.state.text)
    formdata.append('image', this.state.imgSrc)
    formdata.append('title', document.getElementById('editor-title').value)
    formdata.append('author_id', this.props.auth.user._id)
    formdata.append('description', this.state.description)
    formdata.append('claps', 0)
    console.log(formdata)
    axios.post(`http://localhost:3000/api/article`,formdata).then((res) => {
      this.setState({
        loading: false
      }
    )
    }).catch((err)=>{console.log(err); this.setState({loading: false})})
  }

  handleClick = () => {
    this.refs.fileUploader.click()
    // console.log(this.refs.fileUploader)
  }
  previewImg () {
    const file = this.refs.fileUploader.files[0]
    var reader = new FileReader()
    reader.onload = function (e) {
      document.getElementById('image_preview').src = e.target.result
      this.setState({
        imgSrc: file/*e.target.result*/
      })
    }.bind(this)
    reader.readAsDataURL(file)
  }


  render() {
    return (
      <div>
      <EditorHeader publish={this.publishStory} loading={this.state.loading} />
      <div className="container-fluid main-container">
        <div className="row">
          <div id="main-post" className="col-md-6 offset-md-3 main-content">
            <div className="post-metadata">
              <img alt={this.props.auth.user.name}  src={this.props.auth.user.avatar} className="avatar-image" height="40" width="40" />
              <div className="post-info">
                <div data-react-className="PopoverLink" data-react-props=""><span className="popover-link" data-reactroot=""><a href="">{this.props.auth.user.name}</a></span></div>
                <small>{this.props.auth.user.email}</small>
              </div>
            </div>
            <form className="editor-form main-editor" autocomplete="off" >
              <div className={this.state.imgSrc != null ? 'file-upload-previewer' : 'file-upload-previewer hidden'}>
                <img src="" alt="" id="image_preview"/>
              </div>
              <div className="existing-img-previewer" id="existing-img-previewer">
              </div>
              <div className="form-group">
                <span className="picture_upload">
                  <i className="fas fa-camera" onClick={this.handleClick}></i>
                </span>
              </div>
              <div className="form-group">
                <textarea col="1" className="editor-title" id="editor-title" placeholder="Title"></textarea>
              </div>
              <div className="form-group">
                <textarea id="medium-editable" className="medium-editable"></textarea>
              </div>
              <div className="hidden">
                <input 
                  type="file" 
                  onChange={ ()=>this.previewImg()} 
                  id="file" 
                  ref="fileUploader" />
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

const mapStateToProps = ({auth}) =>({
  auth
})

export default connect(mapStateToProps)(Editor)
