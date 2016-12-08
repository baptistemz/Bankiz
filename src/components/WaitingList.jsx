import React, {Component} from 'react';

export default class WaitingList extends Component{
  componentDidMount(){
    $(document).ready(function() {
      $('.modal').modal();
    });
  }
  render(){
    return(
      <div>
        <ul className="list-inline">
          <li>
            <div className="btn-floating btn-large waves-effect waves-light modal-trigger" data-target="modal1"><i className="material-icons">list</i></div>
          </li>
            {
              this.props.list.map((item) => {
                return(
                  <li className="waiting-list-icon">
                    <img src="img/youtube_icon.png" alt="" className="circle avatar-sizing"/>
                    <p className="hover-chip truncate">
                      {item.snippet.title}
                    </p>
                  </li>
                )
              })
            }

        </ul>
        <div id="modal1" className="modal">
          <div className="modal-content">
            <div>
              <h3>Waiting list</h3>
              <ul className="collection">
                {
                  this.props.list.map((item) => {
                    return(
                      <li className="collection-item avatar">
                          <img src="img/youtube_icon.png" alt="" className="circle avatar-sizing"/>
                          <span className="title">{item.snippet.title}</span>
                          <p>youtube</p>
                          <a href="#" className="secondary-content"><i className="material-icons">delete</i></a>
                        </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    )

  }
};
