import React, { Component } from 'react';
import ConcertsService from '../services/ConcertsService';

function convertMillisecondsToDate(milliseconds) {
    return new Date(milliseconds);
  }

class Concerts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            concerts: []
        };
    }

    componentDidMount() {
        ConcertsService.getConcerts().then((res) => {
            this.setState({ concerts: res.data });
        });
    }

    render() {
        return (
            <div className="container">
                <h2 className="text-center">Список концертов</h2>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Location</th>
                                    <th>Ticket Price (S)</th>
                                    <th>Ticket Price (V)</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.concerts.map((concert) => (
                                    <tr key={concert.id}>
                                        <td>{concert.name}</td>
                                        <td>{concert.location}</td>
                                        <td>{concert.ticketPriceS}</td>
                                        <td>{concert.ticketPriceV}</td>
                                        <td>{convertMillisecondsToDate(concert.date).toLocaleDateString()}</td>
                                        <td>{concert.time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Concerts;
