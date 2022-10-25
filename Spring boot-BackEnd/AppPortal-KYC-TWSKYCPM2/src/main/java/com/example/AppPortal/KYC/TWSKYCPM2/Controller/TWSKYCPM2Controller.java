package com.example.AppPortal.KYC.TWSKYCPM2.Controller;

import javax.jws.WebService;
import javax.xml.bind.JAXBElement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.AppPortal.TWSKYCPM2Agent;
import com.example.AppPortal.KYC.TWSKYCPM2.wsdl.WEBSERVICEKYCPERSONNEMORALEResponse;


@RestController
@WebService(name = "WSCNP", targetNamespace="http://172.16.62.248:9095/WSCNP/services" )
@CrossOrigin(origins = "http://localhost:4200")
public class TWSKYCPM2Controller {
	@Autowired

	TWSKYCPM2Agent Agent ;
	@RequestMapping("/")
	public String index( ) {
	
		return "index";
	}
	@RequestMapping("**")
	public String Notfound404() {
		return "Sorry you are in the wrong place !";
	}
	@RequestMapping(value = "/TWSKYCPMParam", method = RequestMethod.POST)
	public JAXBElement<WEBSERVICEKYCPERSONNEMORALEResponse> getTransactions(
			@RequestParam(value="company")		String company, 
			@RequestParam(value="password")	String password,
			@RequestParam(value="userName")	String userName, 
			@RequestParam(value="ColumnName")	String ColumnName, 
			@RequestParam(value="CriteriaValue")	String CriteriaValue, 
			@RequestParam(value="Operand")	String Operand ){
		
	try {
			//System.out.println("dd");
			return Agent.getTransactions(company, password, userName, ColumnName, CriteriaValue, Operand);
			
		} catch (Exception e)
	{
		e.toString();
		return Agent.getTransactions(company, password, userName, ColumnName, CriteriaValue, Operand);
		}
	}
	
	@RequestMapping(value = "/TWSKYCPModel", method = RequestMethod.POST)
	public JAXBElement<WEBSERVICEKYCPERSONNEMORALEResponse> getTransactions(@RequestBody TWSKYCPM2Model twskycpm2Model)
	{
		return Agent.getTransactions(twskycpm2Model);
		
	}
}
