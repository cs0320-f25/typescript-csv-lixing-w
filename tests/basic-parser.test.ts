import { parseCSV } from "../src/basic-parser";
import * as path from "path";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");
const CSV_W_SPACE = path.join(__dirname, "../data/csv_w_space.csv");
const CSV_W_DOUBLE_Q = path.join(__dirname, "../data/csv_w_double_q.csv");
const CSV_W_COMMA = path.join(__dirname, "../data/csv_w_comma.csv");
const CSV_W_COMMA_AND_SPACE = path.join(__dirname, "../data/csv_w_comma_space.csv");
// tests from stencil
test("parseCSV yields arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); // why does this work? :(
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV yields only arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});

// tests for handling spaces
test("parseCSV handles spaces", async () => {
  const results = await parseCSV(CSV_W_SPACE);

  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["number", "description"]);
  expect(results[1]).toEqual(["01", "yay"]);
  expect(results[2]).toEqual(["02", "wow"]);
  expect(results[3]).toEqual(["03", "awa"]);
  expect(results[4]).toEqual(["04", "qwq"]);
});

test("parseCSV yields only arrays when handling spaces", async () => {
  const results = await parseCSV(CSV_W_SPACE);

  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});

// tests for handling double quotes
test("parseCSV handles double quotes", async () => {
  const results = await parseCSV(CSV_W_DOUBLE_Q);
  
  expect(results).toHaveLength(6);
  expect(results[0]).toEqual(["number", "description"]);
  expect(results[1]).toEqual(["01", "yay"]);
  expect(results[2]).toEqual(["02", "wow"]);
  expect(results[3]).toEqual(["03", "awa"]);
  expect(results[4]).toEqual(["04", "21212''2'2'1'2'd''a''.s.e.q'w'd''a'we'"]);
  expect(results[5]).toEqual(["05", ""]);
});

test("parseCSV yields only arrays when handling double quotes", async () => {
  const results = await parseCSV(CSV_W_DOUBLE_Q);

  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});

// tests for handling commas (inside double quotes)
test("parseCSV handles commas inside double quotes", async () => {
  const results = await parseCSV(CSV_W_COMMA);

  expect(results).toHaveLength(8);
  expect(results[0]).toEqual(["number", "description"]);
  expect(results[1]).toEqual(["01", "yay, ahahaha"]);
  expect(results[2]).toEqual(["02", "wow, wow, wow"]);
  expect(results[3]).toEqual(["03", "awa"]);
  expect(results[4]).toEqual(["04", "182812, 192, 1929,,,"]);
  expect(results[5]).toEqual(["05", ",,,,,,,," ]);
  expect(results[6]).toEqual(["06", ",,1212,1212," ]);
  expect(results[7]).toEqual(["07", "121',',',''''12''1'2''12'''2'2'..2.,2,1'2'2,,2,1..2,,3'1,4,1'" ]);
});

test("parseCSV yields only arrays when handling commas inside double quotes", async () => {
  const results = await parseCSV(CSV_W_COMMA);

  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
}); 

// tests for handling commas and spaces 
test("parseCSV handles commas and spaces", async () => {
  const results = await parseCSV(CSV_W_COMMA_AND_SPACE);
  
  expect(results).toHaveLength(8);
  expect(results[0]).toEqual(["number", "description"]);
  expect(results[1]).toEqual(["01", "yay, ahahaha"]);
  expect(results[2]).toEqual(["02", "wow, wow, wow"]);
  expect(results[3]).toEqual(["03", "awa"]);
  expect(results[4]).toEqual(["04", "182812, 192, 1929,,,"]);
  expect(results[5]).toEqual(["05", ",,,,,,,," ]);
  expect(results[6]).toEqual(["06", ",,1212,1212," ]);
  expect(results[7]).toEqual(["07", "121',',',''''12''1'2''12'''2'2'..2.,2,1'2'2,,2,1..2,,3'1,4,1'" ]);
});

test("parseCSV yields only arrays when handling commas and spaces", async () => {
  const results = await parseCSV(CSV_W_COMMA_AND_SPACE);

  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});
