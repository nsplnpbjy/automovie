/*eslint-disable*/
import React, {useState} from "react";
// reactstrap components
import {Card, Container} from "reactstrap";
import {
  Alert,
  Avatar,
  Box,
  Button,
  CardContent,
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
import { blue } from "@mui/material/colors";
// core components

const baseUrl = "https://comradegenrr.top:8090";
function IndexHeader() {
  function Search(text){
    return axios.post(baseUrl+"/s",{searchText:text},{headers:{'token':token}}).then((res)=>{setShowDataList([]);scrollIntoList();
      if(res.data.code!=null){
        if(res.data.code==-1){
          alert(res.data.msg);
          return;
        }
      }
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
  const [authenticationColor,setAuthenticationColor] = useState({
    textColor:'red',
    backgroundColor:'yellow'
  });
  const [token,setToken] = useState('');
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [loginEnable,setLoginEnable] = useState('none');

  const handleSubmit = (url) => (event) => {
    // 阻止默认的表单提交行为
    event.preventDefault();
    // 获取表单数据
    const formData =  new FormData(); // 使用form而不是this或其他的选择器
    formData.append('username',username);
    formData.append('password',password);
      // 发送表单数据到URL
    axios.post(url,formData).then((res)=>{
      if(res.data.code != null){
        if(res.data.code=='0'){
          setToken(res.data.token);
          setLoginEnable('none');
          setAuthenticationColor({
            textColor:'green',
            backgroundColor:'lightwihte'
          })
          alert(res.data.msg);
        }
        else if(res.data.code=='1'){
          alert(res.data.msg);
        }
        else if(res.data.code=='-2'){
          setToken('');
          setAuthenticationColor({
            textColor:'red',
            backgroundColor:'yellow'
          })
          alert(res.data.msg);
        }
        else if(res.data.code=='-3'){
          setToken('');
          setAuthenticationColor({
            textColor:'red',
            backgroundColor:'yellow'
          })
        }
        else{
          alert(res.data.msg);
        }
      }
    });
  };

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
            <Button sx={{color:authenticationColor.textColor,backgroundColor:authenticationColor.backgroundColor}}
            onClick = {(e)=>{
              if(loginEnable=='none'){
                setLoginEnable('block');
              }
              if(loginEnable == 'block'){
                setLoginEnable('none');
              }
            }}>Authentication</Button>
            <Card style={{display:loginEnable,background: "rgba(255,255,255,0)"}}>
              <CardContent sx={{color:'black',fontFamily:"Arial",fontSize:'50%', opacity: 0.5  }}>
                <form>
                  <h1>
                    <label>username</label><input name="username" onChange={(e)=>setUsername(e.target.value)} color={"primary"} size="small"></input>
                  </h1>
                  <h1>
                    <label>password</label><input type='password' name="password" onChange={(e)=>setPassword(e.target.value)} color={"primary"} size="small"></input>
                  </h1>
                  <Button sx={{color:authenticationColor.textColor,backgroundColor:authenticationColor.backgroundColor}} 
                  onClick={handleSubmit(baseUrl+'/login')} type="submit">登陆</Button>
                  <Button sx={{color:authenticationColor.textColor,backgroundColor:authenticationColor.backgroundColor}} 
                  onClick={handleSubmit(baseUrl+'/regist')} type="submit">注册</Button>
                </form>
              </CardContent>
            </Card>
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
              <TextField color={"primary"} size={"small"} value={searchText}
              onKeyDown={(e)=>{if(e.keyCode==13){Search(searchText)}}}
              onChange={(e)=>{setSearchText(e.target.value)}} style={{fontFamily:"Arial",color:"snow",background: "rgba(255,255,255,0.1)",width:"40%"}}/>
              <Button variant="contained"  onClick={()=>{Search(searchText)}}>Search</Button>
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
                      <ListItemAvatar style={{width:"50%"}}>
                        <img style={{width:"80%",height:"100%"}} src={iterm.avatarUrl}></img>
                      </ListItemAvatar>
                      <ListItemText>
                        <Typography fontSize={"small"} maxWidth={"80%"} style={{wordBreak:"break-all",wordWrap:"break-word"}}>名称：{iterm.movieTitle}</Typography>
                        <Typography fontSize={"small"} maxWidth={"80%"} style={{wordBreak:"break-all",wordWrap:"break-word"}}>磁力链接：{iterm.movieUrl}</Typography>
                        <Typography fontSize={"small"} maxWidth={"80%"} style={{wordBreak:"break-all",wordWrap:"break-word"}}>来源：{iterm.lootFrom}</Typography>
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
