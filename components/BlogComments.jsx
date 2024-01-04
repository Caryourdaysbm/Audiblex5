import React from "react";
import Images from "../assets/images/image";

const BlogComments = () => {
  return (
    <section className="container ">
      <div className="comment_section">
        <h5>
          Comments <span>(613)</span>
        </h5>

        <div className="ff_comment">
          <img src={Images.DummyP} alt="" className="small_profile" />

          <div className="comment_it">
            <h5>Esther Howard</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut urna
              semper nulla rutrum lacus semper. Ornare lobortis libero, aenean
              amet donec nibh amet, amet.
            </p>
            <ul className="reaction">
              <li>Reply</li>
              <li>Share</li>
              <li>
                Like <span>(55)</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="ff_comment">
          <img src={Images.DummyP} alt="" className="small_profile" />

          <div className="comment_it">
            <h5>Esther Howard</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut urna
              semper nulla rutrum lacus semper. Ornare lobortis libero, aenean
              amet donec nibh amet, amet.
            </p>
            <ul className="reaction">
              <li>Reply</li>
              <li>Share</li>
              <li>
                Like <span>(55)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="load_more">
          <button className="btn_only">Load more comments</button>
        </div>

        <div className="add_comment">
          <div className="grip">
            <img src={Images.DummyP} alt="" className="small_profile" />
            <textarea name="" id="" cols="30" rows="10"></textarea>
          </div>
          <button className="native-btn">Post</button>
        </div>
      </div>
    </section>
  );
};

export default BlogComments;
