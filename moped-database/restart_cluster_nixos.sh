#!/usr/bin/env bash


distrobox enter test -- /home/frank/bin/hasura migrate apply
distrobox enter test -- /home/frank/bin/hasura metadata apply
distrobox enter test -- /home/frank/bin/hasura seeds apply