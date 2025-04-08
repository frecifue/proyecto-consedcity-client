import React from "react";
import { map } from "lodash";
import { socialData } from "../../../../utils";
import "./Follow.scss";

export function Follow() {
  return (
    <div className="footer-follow">
      
      <p>
        Siguenos en:
      </p>

      {map(socialData, (social) => (
        <a key={social.link} target="_blank" href={social.link} rel="noopener noreferrer">
          <img src={social.img} alt="social-icon" />
        </a>
      ))}
    </div>
  );
}