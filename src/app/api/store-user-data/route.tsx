import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import bcrypt from "bcrypt"
import { randomBytes } from "crypto"; 