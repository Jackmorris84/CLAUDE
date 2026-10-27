import test from "node:test";
import assert from "node:assert/strict";
import { gueltigeId, sichereUrl, schluesselOk, sicherUnter } from "../src/lib/sicherheit.mjs";

test("IDs: nur einfache Namen", () => {
  assert.ok(gueltigeId("tuer-01"));
  assert.ok(!gueltigeId("../x"));
  assert.ok(!gueltigeId("a/b"));
  assert.ok(!gueltigeId(""));
  assert.ok(!gueltigeId("a".repeat(64)));
});

test("URLs: https ja, interne Adressen nein", () => {
  assert.ok(sichereUrl("https://files.example.com/a.mp4").ok);
  assert.ok(!sichereUrl("http://files.example.com/a.mp4").ok);
  for (const u of ["https://localhost/a", "https://127.0.0.1/a", "https://10.0.0.5/a", "https://192.168.1.2/a", "https://172.20.0.1/a", "https://169.254.169.254/latest", "https://[::1]/a", "https://dienst.internal/a", "file:///etc/passwd", "kein url"]) {
    assert.ok(!sichereUrl(u).ok, u);
  }
  assert.ok(sichereUrl("http://localhost:3000/a", { entwicklung: true }).ok);
});

test("Zugriffsschlüssel: ohne gesetzten Schlüssel nie erlaubt", () => {
  assert.ok(schluesselOk("Bearer geheim", "geheim"));
  assert.ok(!schluesselOk("Bearer falsch", "geheim"));
  assert.ok(!schluesselOk("geheim", "geheim"));
  assert.ok(!schluesselOk(undefined, "geheim"));
  assert.ok(!schluesselOk("Bearer ", undefined));
  assert.ok(!schluesselOk("Bearer x", ""));
});

test("Pfade bleiben im Auftragsordner", () => {
  assert.ok(sicherUnter("/jobs/a", "06-export/final.mp4"));
  assert.equal(sicherUnter("/jobs/a", "../b/final.mp4"), null);
  assert.equal(sicherUnter("/jobs/a", "06-export/../../b"), null);
  assert.equal(sicherUnter("/jobs/a", "/etc/passwd"), null);
});
