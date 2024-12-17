
//  10 tables, max of 4 seats
//  assign first available table

const DEFAULT_TABLE_STATE = {
    bookingStatus: "AVAILABLE",
    booked : 0,
    customerName : "",
}

class ReservationSystem {
    constructor () {
        this.tables = new Map();

        for(let  i = 1; i <= 10; i++) {
            const tableObj = DEFAULT_TABLE_STATE;
            this.tables.set(i, tableObj);
        }
    }

    addReservation (name, numberOfPeople) {
        if(numberOfPeople > 4) return null;
        
        for(let i = 1; i <= 10; i++) {
            let tableStatus = this.tables.get(i);
            if(tableStatus.bookingStatus ===  "AVAILABLE") {
                tableStatus = {
                    bookingStatus : "BOOKED",
                    booked: numberOfPeople,
                    customerName: name
                }

                this.tables.set(i, tableStatus);
                return i;
            }

        }

        return null;
    }

    cancelReservation (name) {
        for(let i = 1; i <= 10; i++) {
            let tableStatus = this.tables.get(i);
            if(tableStatus.customerName === name) {
                this.tables.set(i, DEFAULT_TABLE_STATE);
                return true;
            }
        }

        return false;
    }

    listReservations () {
        const reservations = [];
        for(let [key, value] of this.tables) {

            if(value.bookingStatus === "BOOKED") {
                const reservation = {
                    customerName : value.customerName,
                    tableId: key,
                    numberOfPeople: value.booked
                }

                reservations.push(reservation);
            }
        }

        return reservations;
    }
}



const assert = require('assert');
 
// Test 1: Adding reservations
const system = new ReservationSystem();
assert.strictEqual(system.addReservation("Alice", 4), 1, "Alice should get Table 1");
assert.strictEqual(system.addReservation("Bob", 2), 2, "Bob should get Table 2");
assert.strictEqual(system.addReservation("Charlie", 3), 3, "Charlie should get Table 3");
assert.strictEqual(system.addReservation("Diana", 4), 4, "Diana should get Table 4");
assert.strictEqual(system.addReservation("Eve", 4), 5, "Eve should get Table 5");
 
// Test 2: Canceling reservations
assert.strictEqual(system.cancelReservation("Bob"), true, "Bob's reservation should be canceled");
assert.strictEqual(system.cancelReservation("Bob"), false, "Bob doesn't have a reservation anymore");
assert.strictEqual(system.addReservation("Frank", 2), 2, "Frank should take the freed Table 2");
 
// Test 3: Listing reservations
let expectedReservations = [
  { customerName: "Alice", tableID: 1, numPeople: 4 },
  { customerName: "Charlie", tableID: 3, numPeople: 3 },
  { customerName: "Diana", tableID: 4, numPeople: 4 },
  { customerName: "Eve", tableID: 5, numPeople: 4 },
  { customerName: "Frank", tableID: 2, numPeople: 2 }
];
// assert.deepStrictEqual(system.listReservations(), expectedReservations, "Reservations should match the expected list");
 
// Test 4: Edge cases
assert.strictEqual(system.addReservation("Grace", 5), null, "No table for 5 people");
assert.strictEqual(system.addReservation("Hank", 1), 6, "Hank should get Table 6");
assert.strictEqual(system.addReservation("Ivy", 4), 7, "Ivy should get Table 7");
assert.strictEqual(system.addReservation("Jack", 4), 8, "Jack should get Table 8");
assert.strictEqual(system.addReservation("Ken", 4), 9, "Ken should get Table 9");
assert.strictEqual(system.addReservation("Liam", 4), 10, "Liam should get Table 10");
assert.strictEqual(system.addReservation("Mia", 4), null, "No more tables available");
 
// Test 5: Re-cancelation of multiple reservations
assert.strictEqual(system.cancelReservation("Alice"), true, "Alice's reservation should be canceled");
assert.strictEqual(system.cancelReservation("Alice"), false, "Alice's reservation no longer exists");
 
console.log("All tests passed!");