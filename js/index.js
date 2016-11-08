$(document).ready(function(){
    $("#aboutsection").click(function(){
        
        $('html, body').animate({
            scrollTop: 0
        })
    })
    
    $("#projectsection").click(function(){
        
        var offset = $("#projects").offset();
        
        offset.top -= 60;
        
        $('html, body').animate({
            scrollTop: offset.top
        })
    })
    
    $("#contactsection").click(function(){
        
        var offset = $("#contact").offset();
        
        $('html, body').animate({
            scrollTop: offset.top
        })
    })
    
})