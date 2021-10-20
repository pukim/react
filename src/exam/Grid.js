import React from "react";
import { makeStyles } from "@material-ui/core";
import { Button } from '@material-ui/core';

import { DataGrid } from "@material-ui/data-grid";
//import { DataGrid } from "@mui/x-data-grid";
import { XGrid } from "@material-ui/x-grid";

const Grid = ({match}) => {
	const cols=[
	 {
      field: 'id',
      headerName: 'id',   
      // hide: true,
    },
    {
      field: 'name',
      headerName: 'name',
      width:300,
    },
    {
      field: 'age',
      headerName: 'age',
      type: 'number',
    },
    {
      field: 'role',
      headerName: 'role',
      width:'200', 
      
      renderCell:(params)=>{
      	return(
      	      params.row.role.map((item,idx)=>(
      	         
      	            `${item}<br/>`
      	      
      	         
      	      ))
      	);
      }
    },
  ];
	
  const data = [
    { id: "1", name: "test1", age: 30, role:['user'] },
    { id: "2", name: "test2", age: 32, role:['user'] },
    { id: "3", name: "test3", age: 33, role:['admin'] },
    { id: "4", name: "test4", age: 34, role:['user','manager']},
    { id: "5", name: "test5", age: 35, role:['manager']},
    { id: "6", name: "test6", age: 33, role:['manager','admin']},
  ];

  const useStyle = makeStyles((theme)=>(
  {
  	root:{},
  }));

  const handleCellClick = (params, e) => {
     console.log('params', params);
  };
    
  return (
    <div style={{height:'800px', width:'100%'}}>
       <DataGrid
         rows={data} 
         columns={cols} 
         pageSize={30} 
         checkboxSelection
         isRowSelectable={(params) => (params.row.age == 33)}
         onCellClick={handleCellClick}
       />
       <Button variant="contained" color="primary"> 
            Hello World
       </Button>
    </div>
    );
  // return <DataGrid {...data} />;
};

export default Grid;
