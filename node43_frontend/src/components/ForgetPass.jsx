import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, CardMedia } from "@mui/material";
import FacebookLogin from "react-facebook-login";
import { Videos, ChannelCard } from ".";
import {
  forgetCheckCodeAPI,
  forgetCheckMailAPI,
  loginAPI,
  loginFacebookAPI,
} from "../utils/fetchFromAPI";
import ReactFacebookLogin from "react-facebook-login";

const ForgetPass = () => {
  const [channelDetail, setChannelDetail] = useState();

  const [videos, setVideos] = useState(null);

  const [email, setEmail] = useState(null);

  const [code, setCode] = useState(null);

  const [password, setPassword] = useState(null);

  const { id } = useParams();

  const handleNextStep1 = () => {
    if (!email) {
      alert("You must fill ur email");
      return;
    }
    forgetCheckMailAPI({ email: email })
      .then((result) => {
        setStep(1);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const handleNextStep2 = () => {
    if (!code) {
      alert("You must fill code");
      return;
    }
    forgetCheckCodeAPI({ code: code })
      .then((result) => {
        setStep(2);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const [step, setStep] = useState(0);

  useEffect(() => {
    setStep(0);
    setEmail(null);
    setPassword(null);
    setVideos(null);
    setChannelDetail(null);
  }, []);

  return (
    <div className="p-5 " style={{ minHeight: "100vh" }}>
      <div className=" d-flex justify-content-center">
        {step === 0 && (
          <form className="row g-3 text-white">
            <div className="col-md-12">
              <label htmlFor="inputEmail4" className="form-label">
                Nhập Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div className="col-12">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleNextStep1}
              >
                Next
              </button>
            </div>
          </form>
        )}

        {step === 1 && (
          <form className="row g-3 text-white">
            <div className="col-md-12">
              <label htmlFor="inputEmail4" className="form-label">
                Nhập code
              </label>
              <input
                type="email"
                className="form-control"
                id="code"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                }}
              />
            </div>

            <div className="col-12">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleNextStep2}
              >
                Next
              </button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form className="row g-3 text-white">
            <div className="col-md-12">
              <label htmlFor="inputEmail4" className="form-label">
                Nhập password mới
              </label>
              <input
                type="email"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <div className="col-12">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {}}
              >
                Đổi mật khẩu
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgetPass;
