//Function for creating bar graph 
function graph(id_input) {
        //read the data
        d3.json("samples.json").then((data_json) => {
                //get the data of ids, sample values hover text ->labels
                var samplesdata = data_json.samples;
                // filter the data to only get the information associated with the input id
                var id_data = samplesdata.filter(x => x.id == id_input);
       
        var otu_ids = id_data[0].otu_ids;
        var otu_labels = id_data[0].otu_labels;
        var otu_values = id_data[0].sample_values;
        //format your id to add OTU in the beginning
        var yValues = otu_ids.slice(0, 10).map(x => "OTU" + x).reverse()
        //this where you select your x axis value, y axis value and type of graph
        var Data = {
                 //top 10 values
                x: otu_values.slice(0, 10).reverse(), 
                // formatted ids    
                y: yValues,
                //labels
                text: otu_labels.slice(0, 10).reverse(),     
                type: "bar", 
                orientation: "h"
        };
        var setLayout = {
                title: "Bacteria found"
        };
        var data = [Data];
        Plotly.newPlot("bar", data, setLayout);
    });
};


//drop down menu
function defaultfunction() {
    //this populates the dropdown for users to choose
    d3.json("samples.json").then((data) => {
            var names = data.names;
            names.forEach((name) => {
                    d3.select("#selDataset").append("option").text(name).property("value", name);
            });
        graph(data.names[0]);
 
    });
};


// this function should change the visualisations based on the selected id
function optionChanged(userInput) {    
    bargraph(userInput);    
    
};
//this is the default function you initialise that chooses a default option
defaultfunction();
