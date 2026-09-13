#!/usr/bin/env node
/**
 * Crea en GitHub la épica y las 16 tareas desde .king/issues.json.
 *
 * Existe porque la escritura a GitHub estaba denegada cuando se corrió el
 * pipeline: `POST /issues` devolvía `403 Resource not accessible by integration`
 * y `git push` devolvía 403 con "Claude doesn't have GitHub access to
 * InformatiK-AI/landing-spiderman for your organization". Las cargas quedaron
 * listas para no perder el trabajo.
 *
 * Uso:
 *   GITHUB_TOKEN=ghp_xxx node scripts/file-issues.mjs            # de verdad
 *   GITHUB_TOKEN=ghp_xxx node scripts/file-issues.mjs --dry-run  # sin escribir
 *
 * El token necesita permiso de escritura en issues del repositorio.
 */
import { readFileSync } from "node:fs";

const DRY = process.argv.includes("--dry-run");
const token = process.env.GITHUB_TOKEN;

if (!token && !DRY) {
  console.error("Falta GITHUB_TOKEN. Usa --dry-run para ver qué se crearía.");
  process.exit(1);
}

const { repo, epic, issues } = JSON.parse(readFileSync(".king/issues.json", "utf8"));
const api = `https://api.github.com/repos/${repo}/issues`;

async function create(payload) {
  if (DRY) {
    console.log(`[dry-run] ${payload.title}  ${payload.labels ? `[${payload.labels.join(", ")}]` : ""}`);
    return { number: 0 };
  }
  const response = await fetch(api, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`${payload.title}: ${response.status} ${await response.text()}`);
  }
  const created = await response.json();
  console.log(`#${created.number}  ${payload.title}`);
  return created;
}

const created = await create({ title: epic.title, body: epic.body ?? "", labels: epic.labels });

for (const issue of issues) {
  await create({
    title: issue.title,
    body: `${issue.body}\n\nParte de #${created.number}.`,
    labels: issue.labels,
  });
}

console.log(`\n${DRY ? "[dry-run] " : ""}${issues.length + 1} issues (1 épica + ${issues.length} tareas).`);
