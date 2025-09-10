import { parseCSV } from "../src/basic-parser";
import * as path from "path";
import { z } from "zod";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");
const CSV_NO_HEADER_NSS = path.join(__dirname, "../data/csv_no_header_nss.csv");

// tests checking if it falls back to string[][] output
test("parseCSV falls back to string[][] output on schema mismatch", async () => {
  const PersonRowSchema = z.tuple([z.string(), z.coerce.number()])
                            .transform( tup => ({name: tup[0], age: tup[1]}))
  type Person = z.infer<typeof PersonRowSchema>;
  const results = await parseCSV<Person>(PEOPLE_CSV_PATH, PersonRowSchema)
  
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); // falls back!
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

// tests checking if it works with no header on schema match
test("parseCSV works with no header on schema match", async () => {
  const NoHeaderNSSSchema = z.tuple([z.coerce.number(), z.string(), z.string()])
                            .transform( tup => ({id: tup[0], desc0: tup[1], desc1: tup[2]}))
  type NoHeaderNSS = z.infer<typeof NoHeaderNSSSchema>;
  const results = await parseCSV<NoHeaderNSS>(CSV_NO_HEADER_NSS, NoHeaderNSSSchema)
  
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual({id: 1, desc0: "abc", desc1: "def"});
  expect(results[1]).toEqual({id: 2, desc0: "hsd", desc1: "ashjbksc"});
  expect(results[2]).toEqual({id: 3, desc0: "wqhjb", desc1: "askbjh"});
  expect(results[3]).toEqual({id: 4, desc0: "ash", desc1: "weqhb"});
  expect(results[4]).toEqual({id: 5, desc0: "kajhbs", desc1: "qwkbh"});
});
