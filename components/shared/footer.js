import React, {Component} from 'react'

export default class Footer extends Component{
    render(){
        return(
            <footer>
  <div className="container-fluid footer-container">
    <div className="row footer-row">
      <div className="col-sm-2 first-section">
        <ul className="new-homepage-footer-links">
          <h4>Product</h4>
          <li>
            <a href="/examples">Examples</a>
          </li>
          <li>
            <a href="/features">Features</a>
          </li>
          <li>
            <a href="/pricing">Pricing</a>
          </li>
        </ul>
      </div>
      <div className="col-sm-2 second-section">
        <ul className="new-homepage-footer-links">
          <h4>Learn</h4>
          <li>
            <a target="_blank" rel="noopener noreferrer" href="https://teachable.zendesk.com/hc/en-us">Knowledge Base</a>
          </li>
          <li>
            <a target="_blank" rel="noopener noreferrer" href="http://blog.teachable.com/">Blog</a>
          </li>
          <li>
            <a href="/enterprise">Enterprise</a>
          </li>
        </ul>
      </div>
      <div className="col-sm-2 third-section">
        <ul className="new-homepage-footer-links">
          <h4>Company</h4>
          <li>
            <a href="/careers">Careers</a>
          </li>
          <li>
            <a href="/experts">Experts</a>
          </li>
          <li>
            <a href="/affiliates">Become an affiliate</a>
          </li>
        </ul>
      </div>
      <div className="col-sm-3">
        <ul className="new-homepage-footer-links">
          <h4>Legal</h4>
          <li>
            <a href="/privacy-policy">Privacy Policy</a>
          </li>
          <li>
            <a href="/terms-of-use">Terms of Use</a>
          </li>
        </ul>
      </div>
      <div className="col-sm-3">
        <ul className="new-homepage-footer-links">
          <h4>Get in touch</h4>
          <li>We're here if you need us:</li>
          <li>
            <a href="/cdn-cgi/l/email-protection#691a1c1919061b1d291d0c080a01080b050c470a0604">Contact us</a>
          </li>
          <li className="social-icons">
            <a target="_blank" rel="noopener noreferrer" className="social-icon" href="https://www.facebook.com/teachableHQ/">
              <img src="/assets/footer/facebook_icon-4123fb4aef6386d557ed654543029d5964d42775cc972ce186789292243d19e7.png" width="32px"/>
            </a>
            <a target="_blank" rel="noopener noreferrer" className="social-icon" href="https://twitter.com/teachable">
              <img src="/assets/footer/twitter_icon-dfcd749e19035479055f2de4729aa45470ce648b11f56aad4534a89d83947930.png" width="32px"/>
            </a>
            <a target="_blank" rel="noopener noreferrer" className="social-icon" href="https://www.pinterest.com/teachablehq/">
              <img src="/assets/footer/pinterest_icon-f81e2671629b0d1716cbdce81fd1500d598c50e9d65ee3c50950dcc89bfbe827.png" width="32px" />
            </a>
            <a target="_blank" rel="noopener noreferrer" className="social-icon" href="https://www.instagram.com/teachable/">
              <img src="/assets/footer/instagram_icon-1e222076e9d388360f27a800afdd9571892dd5143ff480daea7bd879c84f8005.svg" width="32px" />
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div className="row">
      <div className="col-sm-12 new-homepage-footer-logo">
        <a href="/">
          <img alt='' src="/assets/teachable-logo-orange-3ece80f83dd5fdb472495dd41735abbb3e685c351b2e54a84aaee8c56e9f1283.svg" className="new-homepage-footer-logo" />
        </a>
        <span>All rights reserved The Academist&trade; 2018</span>
      </div>
    </div>
  </div>
</footer>
        );
    }
}