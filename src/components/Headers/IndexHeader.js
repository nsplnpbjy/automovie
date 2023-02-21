/*eslint-disable*/
import React, {useState} from "react";

// reactstrap components
import {Container} from "reactstrap";
import {
  Avatar,
  Box,
  Button,
  Divider, Icon,
  List,
  ListItem, ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText, TextField,
  Typography
} from "@mui/material";
import axios from "axios";
import copy from "copy-to-clipboard";
// core components

const baseUrl = "https://comradegenrr.top:8090";
function IndexHeader() {
  function Search(text){
    return axios.post(baseUrl+"/s",{searchText:text}).then((res)=>{console.log(res.data);scrollIntoList();
      if (res.data.moviePojoList!=""){
        setShowDataList(res.data.moviePojoList)}
      else {
        alert("什么都没有找到")
    }
    });
  }

  function scrollIntoList(){
    let point = document.getElementById("list");
    point.scrollIntoView();
  }

  function copyLink(link){
    copy(link);
    console.log(link);
    alert("下载链接已复制到剪贴板");
  }

  let pageHeader = React.createRef();
  const [searchText,setSearchText] = useState("");
  const [showDataList,setShowDataList] = useState([]);

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  return (
    <div style={{ backgroundImage: "url(" + require("assets/img/header.jpg") + ")"}}>
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/header.jpg") + ")"
          }}
          ref={pageHeader}
        ></div>
        <Container>
          <div className="content-center brand">
            <h1 className="h1-seo">Movie Hub</h1>
            <h3 color={"blue"}>Get film magnet links for free.</h3>
            <h6>
              Designed by{" "}
              <a href="http://invisionapp.com/?ref=creativetim" target="_blank">
                <img
                    alt="..."
                    className="invision-logo"
                    src={require("assets/img/invision-white-slim.png")}
                ></img>
              </a>
              . Coded by{" "}
              <a
                  href="https://github.com/nsplnpbjy?tab=repositories"
                  target="_blank"
              >
                ComradeGenrr
              </a>
              .
            </h6>
            <div>
              <TextField color={"primary"} size={"small"} value={searchText} onChange={(e)=>{setSearchText(e.target.value)}} style={{fontFamily:"Arial",color:"snow",background: "rgba(255,255,255,0.1)",width:"40%"}}/>
              <Button variant="contained" onClick={()=>{Search(searchText)}}>Search</Button>
            </div>
          </div>
        </Container>
      </div>
      <div id={"list"} style={{width:"100%",background: "rgba(255,255,255,0)"}} >
        <Container style={{width:"100%",background: "rgba(255,255,255,0)"}}>
          <List height={400} width={300} itemSize={46} itemCount={200} style={{background: "rgba(255,255,255,0)"}}>
            {
              showDataList.map((iterm)=>{
                return <Box sx={{ width: '100%',maxWidth:"initial",color:"lightblue",background: "rgba(255,255,255,0)" }}>
                  <ListItem width = "100%">
                    <ListItemButton onClick={(e)=>{copyLink(iterm.movieUrl)}}>
                      <ListItemAvatar >
                        <img style={{width:"80%"}} src={iterm.avatarUrl}></img>
                      </ListItemAvatar>
                      <ListItemText>
                        <Typography maxWidth={"100%"} style={{wordBreak:"break-all",wordWrap:"break-word"}}>名称：{iterm.movieTitle}</Typography>
                        <Typography maxWidth={"100%"} style={{wordBreak:"break-all",wordWrap:"break-word"}}>磁力链接：{iterm.movieUrl}</Typography>
                        <Typography maxWidth={"100%"} style={{wordBreak:"break-all",wordWrap:"break-word"}}>来源：{iterm.lootFrom}</Typography>
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </Box>
              })
            }
          </List>
        </Container>
      </div>
    </div>
  );
}

export default IndexHeader;
