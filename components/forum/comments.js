import React, { Component } from "react";
import { User, EyeOff } from "react-feather";
import { withRouter } from "react-router-dom";
import Moment from "react-moment";
import settings from "../../settings";
class CommentList extends Component {
  state = {
    image: "https://via.placeholder.com/150x150"
  };

  fetchInfo(id) {
    fetch(settings.urls.show_info.replace("{user_id}", id), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      mode: "cors"
    })
      .then(response => response.json())
      .then(data => {
        debugger;
        this.setState({ image: data.image });
      });
  }

  componentDidMount() {
    let id = this.props.match.params.forum_id;
    this.fetchInfo(id);
  }

  render() {
    let comments = this.props.reply;
    return (
      <div className="container-fluid">
        {comments.map((stuff, id) => (
          <div key={stuff.id} className="row-fluid forum-comment-row">
            <div className="col-md-2" />

            <div className="col-md-8">
              <div className="col-spacings help-box">
                <div className="row article-sub-row">
                  <div className="col-md-2" style={{ overflow: "hidden" }}>
                    <img src={this.state.image}  style={{maxWidth: "100%", maxHeight: "100%"}}/>
                    {/* {this.fetchInfo(this, stuff.by)} */}
                  </div>
                  <div className="col-md-10">
                    <div className="row">
                      <div className="col-md-6">
                        <span className="forum-by">
                          <span className="forum-poster-name">
                            {stuff.firstName} {stuff.lastName}
                          </span>{" "}
                          said
                        </span>
                        <br />
                        <span className="forum-posted-date">
                          Commented on &nbsp;
                          <Moment format="MMM Do, YYYY">
                            {stuff.createdAt}
                          </Moment>
                        </span>
                      </div>

                      <div className="col-md-2" />
                      <div className="col-md-4 forum-report">
                        <EyeOff />&nbsp;Report
                      </div>
                    </div>

                    <br />
                    <span className="content">{stuff.content}</span>
                  </div>
                </div>

                <div className="col-md-2" />
              </div>
            </div>

            <div className="col-md-2" />
            <div className="clearfix" />
          </div>
        ))}
        <div className="clearfix" />
      </div>
    );
  }
}

export default withRouter(CommentList);
